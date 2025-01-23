import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import swal from 'sweetalert2';
import { ProductFormComponent } from 'app/pages/product/product-form/product-form.component';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  search_key: any;
  searchTimeout: any;
  tableData: any = [];
  total_record = 0;
  loadingGet = false;
  page = 1;
  allPageSize = this.allFunction.allPage;
  page_size = this.allPageSize[0];
  loadingRequest = false;
  backupData: any;
  AppName = '';

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private toastSerivce: NGXToastrService,
    private allService: AllService,
    private allFunction: GeneralFunctionService, 
  ) { 

  }

  ngOnInit() {
    this.getDataList()
  }

  
  refresh() {
    this.page = 1;
    this.search_key = null
    this.getDataList()
  }

  onSearch() {
    this.clearSearch();
    this.loadingGet = true;
    this.searchTimeout = setTimeout(() => {
      this.searchTimeout = null;
      this.getDataList()
    }, this.allFunction.searchDelay);
  }

  clearSearch() {
    if (this.searchTimeout) {
      this.loadingGet = false;
      clearTimeout(this.searchTimeout)
      this.searchTimeout = null;
    }
  }

  loadPage(event: any) {
    this.page = event.pageIndex + 1;
    this.page_size = event.pageSize;
    this.getDataList();
  }

  getDataList() {
    this.loadingGet = true;
    let filter = {
      page: this.page,
      size: this.page_size,
      keyword: this.search_key
    }
    this.allService.getAllDataWithFilter(this.allService.orderUrl, filter).subscribe(
      (data: any) => {
        this.total_record = data.paging.total;
        console.log('data order', data)
        this.tableData = data['data'].map((item: { index: any; }, index: number) => {
          item.index = (this.page_size * (this.page - 1)) + (index + 1);
          return item;
        });
        console.log('data', data)
        this.loadingGet = false;
      },
      err => {
        this.loadingGet = false;
        console.log('err', err)
      }
    )
  }


  openForm(type: 'add' | 'edit', data?: any) {
    let tmp_DialogData: any = {
      size: "medium",
      type: type,
      form_name: 'order-form'
    }
    const dialogRef = this.dialog.open(OrderFormComponent,
      this.allFunction.dialogData(
        tmp_DialogData.size,
        tmp_DialogData.type,
        tmp_DialogData.form_name,
        data
      )
    )
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          if (result.is_refresh) {
            this.getDataList();
          }
        }
        console.log('close', result)
      }
    )
  }

  askingDelete(data: any) {
    if (!this.loadingRequest) {
      let tmp_title = '';
      let tmp_message = '';
      if (localStorage.getItem('lang')) {
        if (localStorage.getItem('lang') == 'en') {
          tmp_title = 'Are you sure?'
          tmp_message = "You want to delete this data?"
        }
        if (localStorage.getItem('lang') == 'kh') {
          tmp_title = 'តេីអ្នកប្រាកដឬទេ?'
          tmp_message = "អ្នកចង់លុបទិន្នន័យនេះ?" 
        }
      }
      else {
        tmp_title = 'Are you sure?'
        tmp_message = "You want to delete this data?"
      }
      swal.fire(this.allFunction.askingText('delete'))
        .then((result) => {
          console.log(result)
          if (result.value) {
            this.deleteData(data.id);
          }
        });
    }
  }

  
  deleteData(id: any) {
    this.allService.deleteData(this.allService.productUrl +'/',id).subscribe(
      data => {
        console.log('deleted data', data)
        this.toastSerivce.typeSuccessDelete();
        this.refresh()
      },
      err => {
        this.toastSerivce.typeErrorDelete();
        console.log('err', err)
      }
    );
  }
}
