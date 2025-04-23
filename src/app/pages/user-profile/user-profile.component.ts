import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import { CategoryFormComponent } from '../category/category-form/category-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  type: any;
  importData: any;
  loadingGet = []
  loadingSubmit = false;
  isRefreshTable = false;
  // imageUrl: string = '';
  imageUrl: string | null = 'assets/images/no-image.png';
  cateList: any;
  allRole:any;

  inputGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    roleId: new FormControl(''),
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
      // console.log('data detial', this.importData)
      this.getImageUrl(this.importData);

    }
  }

  ngOnInit() {
    this.getRole()
  }

  get f() {
    return this.inputGroup.controls
  }

  getRole(){
    this.allService.getAllData(this.allService.roleUrl).subscribe(
      (data:any) =>{
        console.log('role:', data);
        this.allRole = data.data;
      }
    )
  }


  onImageSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImage = files[0];
      this.getImageUrl({ avatar: this.selectedImage });
    }
  }

  getImageUrl(slideShow: any) {
    if (this.selectedImage) {
      this.imageUrl = URL.createObjectURL(this.selectedImage);
    } else {
      if (slideShow.avatar) {
        this.imageUrl = slideShow.avatar;
      } else {
        this.imageUrl = 'assets/images/no-image.jpg';
      }
    }
  }

  getDataDetail() {
    this.loadingGet.push()
    this.allService.getDataById(this.allService.userUrl, '/' + this.importData.id).subscribe(
      data => {
        this.importData = data
        this.setDataIntoForm()
        this.loadingGet.pop()
        console.log('data detail', data)
      },
      err => {
        this.loadingGet.pop()
        console.log('err', err)
      }
    );
  }

  setDataIntoForm() {
    this.f.name.setValue(this.importData.data.name)
    this.f.email.setValue(this.importData.data.email)
    this.f.gender.setValue(this.importData.data.gender)
    this.f.roleId.setValue(this.importData.data.role.id)

    console.log('data log ', this.importData.data.categoryName)
  }


  editData() {
    if (this.isValid()) {
      this.loading();
      const tmp_data = {
        // "name": this.f.name.value,
        // "price": this.f.price.value,
        // "discount": this.f.discount.value,
        // "categoryId": this.importData.data.id,
        // "optionProducts": [
        //   {
        //     "name": this.f.nameColor.value,
        //     "value": this.f.valueColor.value,
        //   }
        // ],
        // "description": this.f.description.value
      }

      console.log('data json test', tmp_data)

      this.allService.editData(this.allService.userUrl + '/', tmp_data, this.importData.data.id).subscribe(
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
