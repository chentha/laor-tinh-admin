import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import { CategoryFormComponent } from 'app/pages/category/category-form/category-form.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  type: any;
  importData: any;
  loadingGet = []
  loadingSubmit = false;
  isRefreshTable = false;
  // imageUrl: string = '';
  imageUrl: string | null = 'assets/images/no-image.png';
  statusOrder: { value: string, label: string }[] = [
    { value: 'reject', label: 'Reject' },
    { value: 'comfirm', label: 'Comfirm' },
    { value: 'complete', label: 'Complete' },
    { value: 'return', label: 'Return' }
  ];

  inputGroup = new FormGroup({
    orderStatus: new FormControl(''),
  })
  selectedImage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDetail: any,
    public allFunction: GeneralFunctionService,
    private allService: AllService,
    private ToastrService: NGXToastrService,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
  ) {
    // get form type and url 
    console.log('tmp data', this.dataDetail)
    this.type = this.dataDetail.type
    if (this.type == 'add') {

    }
    else if (this.type == 'edit') {
      this.importData = this.dataDetail.data
      this.getDataDetail()

    }
  }

  ngOnInit() {

  }

  get f() {
    return this.inputGroup.controls
  }

  // getAllCate() {
  //   this.allService.getAllData(this.allService.categoryUrl).subscribe(
  //     (data: any) => {
  //       this.cateList = data.data;
  //       console.log('data', this.cateList)
  //     }
  //   )
  // }

  getDataDetail() {
    this.loadingGet.push()
    this.allService.getDataById(this.allService.orderUrl, '/' + this.importData.id).subscribe(
      data => {
        this.importData = data
        this.loadingGet.pop();
        this.setDataIntoForm();
        console.log('data detail', data);
      },
      err => {
        this.loadingGet.pop()
        console.log('err', err)
      }
    );
  }

  setDataIntoForm(){
    this.f.orderStatus.setValue(this.importData.data.orderConstant.toLowerCase());
  }

  editData() {
    if (this.isValid()) {
      this.loading();
      const tmp_data = this.f.orderStatus.value
      console.log('tmp data', tmp_data)

      this.allService.editOrder(this.allService.orderStatusUrl + '/', this.importData.data.id, tmp_data).subscribe(
        data => {
          console.log('data', data);
          this.isRefreshTable = true;
          this.ToastrService.typeSuccessEdit();
          this.loaded();
        },
        err => {
          this.ToastrService.typeErrorEdit()
          console.log('err', err);
          this.loaded();
        }
      );
    }
  }

  isValid() {
    if (!this.inputGroup.valid || this.loadingSubmit || this.loadingGet.length > 0) {
      return false
    }
    return true;
  }

  loading() {
    this.inputGroup.disable()
    this.loadingSubmit = true;
  }

  loaded() {
    this.inputGroup.enable()
    this.loadingSubmit = false;
  }

  closeForm() {
    this.allFunction.closeDialog(this.dataDetail.form_name)
    setTimeout(() => {
      this.dialogRef.close(
        { is_refresh: this.isRefreshTable }
      );
    }, this.allFunction.closeDelaySmall);
  }
}
