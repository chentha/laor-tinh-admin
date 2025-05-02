import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import { BannerFormComponent } from 'app/pages/banner/banner-form/banner-form.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.scss']
})
export class ShippingListComponent {
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
  userId:any;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private toastSerivce: NGXToastrService,
    private allService: AllService,
    private ToastrService: NGXToastrService,
    private allFunction: GeneralFunctionService, 
  ) { 
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.userId = parsedData.id; // or whatever field you need
      console.log('User ID:', this.userId);
    }
    
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
    this.allService.getAllDataWithFilter(this.allService.shippingUrl, filter).subscribe(
      (data: any) => {
        this.total_record = data.paging.total;
        console.log('data user', data)
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

  askingAssign(data: any) {
    if (!this.loadingRequest) {
      let tmp_title = '';
      let tmp_message = '';
      if (localStorage.getItem('lang')) {
        if (localStorage.getItem('lang') == 'en') {
          tmp_title = 'Are you sure?'
          tmp_message = "You want to assign this delivery?"
        }
      }
      else {
        tmp_title = 'Are you sure?'
        tmp_message = "You want to assign this delivery?"
      }
      swal.fire(this.allFunction.askingText('assign'))
        .then((result) => {
          console.log(result)
          if (result.value) {
            this.assignDelivery(data);
          } 
        });
    }
  }

  assignDelivery(data?:any){
    let inputData = {
      "user": this.userId,
      "orderNo": data.orderNo
    }
    console.log('input data', inputData)
    this.allService.assignDelivery(this.allService.shippingUrl + '/', inputData).subscribe(
      (data:any) =>{
        console.log('assign sucess', data)
        this.toastSerivce.typeSuccessEdit()
      }
    )
  }


  openForm(type: 'add' | 'edit', data?: any) {
    let tmp_DialogData: any = {
      size: "medium",
      type: type,
      form_name: 'banner-form'
    }
    const dialogRef = this.dialog.open(BannerFormComponent,
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
            this.deleteData(data?.shippingId);
          } 
        });
    }
  }

  
  deleteData(id: any) {
    console.log('id delete',id)
    this.allService.deleteData(this.allService.shippingUrl+'/', id).subscribe(
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
