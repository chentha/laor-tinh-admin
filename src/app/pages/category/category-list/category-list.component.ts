import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import swal from 'sweetalert2';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
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
      page_size: this.page_size,
      search: this.search_key
    }
    this.allService.getAllDataWithFilter(this.allService.productUrl, filter).subscribe(
      (data: any) => {
        this.total_record = data;
        console.log('data category', data)
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
      form_name: 'category-form'
    }
    const dialogRef = this.dialog.open(CategoryFormComponent,
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
    this.allService.deleteData(this.allService.categoryUrl, id).subscribe(
      data => {
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
