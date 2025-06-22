import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import { CategoryFormComponent } from 'app/pages/category/category-form/category-form.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent {
  type: any;
  importData: any;
  loadingGet = []
  loadingSubmit = false;
  isRefreshTable = false;
  imageUrl: string | null = 'assets/images/no-image.png';
  roleList: any;
  selectedImage: any;
  url = environment.baseAPI;

  inputGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    isActive: new FormControl('')
  })

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
      // this.getDataDetail()

      console.log(this.importData.thumbnail)

      this.setDataIntoForm()
    }
  }

  ngOnInit() {

  }

  get f() {
    return this.inputGroup.controls
  }


  onImageSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImage = files[0];
      this.getImageUrl({ thumbnail: this.selectedImage });
    }
  }

  getImageUrl(slideShow: any) {
    if (this.selectedImage) {
      this.imageUrl = URL.createObjectURL(this.selectedImage);
    } else {
      if (slideShow.thumbnail) {
        this.imageUrl = slideShow.thumbnail;
      } else {
        this.imageUrl = 'assets/images/no-image.png';
      }
    }
  }

  // getDataDetail() {
  //   this.loadingGet.push()
  //   this.allService.getDataById(this.allService.bannerUrl, '/' + this.importData.id).subscribe(
  //     data => {
  //       this.importData = data
  //       this.setDataIntoForm()
  //       this.loadingGet.pop()
  //       console.log('data detail', data)
  //     },
  //     err => {
  //       this.loadingGet.pop()
  //       console.log('err', err)
  //     }
  //   );
  // }


  setDataIntoForm() {
    this.f.title.setValue(this.importData.title);
    this.getImageUrl(this.importData);
  }

  createData() {
    if (this.isValid()) {
      this.loading()
      const inputData = new FormData(); 
      inputData.append('title', this.f.title.value || '');

      console.log('json data', inputData)

      if(this.selectedImage){
        inputData.append('thumbnail', this.selectedImage);
      }
      this.allService.createData(this.allService.bannerUrl, inputData).subscribe(
        (data: any) => {
          console.log('data', data)
          this.isRefreshTable = true;
          this.ToastrService.typeSuccessCreate()
          this.loaded();
  
        },
        err => {
          this.ToastrService.typeErrorCreate()
          console.log('err', err)
          this.loaded()
        }
      )
    }
  }


  editData() {
    if (this.isValid()) {
      this.loading();
      let inputData = {
        "isActive": this.f.isActive.value || false
      }
      this.allService.editDataPatch(this.allService.bannerUrl + '/', inputData, this.importData.id).subscribe(
        data => {
          console.log('data edit success', data);
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
