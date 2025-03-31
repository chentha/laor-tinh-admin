import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import { CategoryFormComponent } from 'app/pages/category/category-form/category-form.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  type: any;
  importData: any;
  loadingGet = []
  loadingSubmit = false;
  isRefreshTable = false;
  // imageUrl: string = '';
  imageUrl: string | null = 'assets/images/no-image.png';
  cateList: any;

  inputGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discount: new FormControl(''),
    categoryId: new FormControl(''),
    nameColor: new FormControl(''),
    valueColor: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl('')
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
    this.getAllCate();
  }

  get f() {
    return this.inputGroup.controls
  }

  getAllCate() {
    this.allService.getAllData(this.allService.categoryUrl).subscribe(
      (data: any) => {
        this.cateList = data.data;
        console.log('data', this.cateList)
      }
    )
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
        this.imageUrl = 'assets/images/no-image.jpg';
      }
    }
  }

  getDataDetail() {
    this.loadingGet.push()
    this.allService.getDataById(this.allService.productUrl, '/' + this.importData.id).subscribe(
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
    this.f.price.setValue(this.importData.data.unitPrice)
    this.f.categoryId.setValue(this.importData.data.categoryName)
    this.f.discount.setValue(this.importData.data.discount)
    this.f.description.setValue(this.importData.data.description)

    console.log('data log ', this.importData.data.categoryName)
  }

  createData() {
    if (this.isValid()) {
      this.loading()
      const tmp_data = {
        "name": this.f.name.value,
        "price": this.f.price.value,
        "discount": this.f.discount.value,
        "categoryId": this.f.categoryId.value,
        "quantity": this.f.quantity.value,
        "optionProducts": [
          {
            "name": this.f.nameColor.value,
            "value": this.f.valueColor.value,
            "thumbnail": "thumbnail.jpg"
          }
        ],
        "description": this.f.description.value
      }
      console.log('json data', tmp_data)

      this.allService.createData(this.allService.productUrl, tmp_data).subscribe(
        (data: any) => {
          console.log('data', data)
          this.isRefreshTable = true;
          this.type = 'edit';
          this.importData = data;
          // this.ToastrService.typeSuccessCreate()
          this.loaded();
          const ProdID = data.data.id;

          if (this.selectedImage) {
            const inputData = new FormData();
            inputData.append("files", this.selectedImage);

            this.allService.createData(this.allService.productUrl + '/' + ProdID + '/images', inputData).subscribe(
                (imageData: any) => {
                  this.ToastrService.typeSuccessCreate()
                  console.log("Image uploaded successfully", imageData);
                },
                (imageError: any) => {
                  console.error("Image upload failed", imageError);
                }
              );
          } else {
            this.ToastrService.typeSuccessCreate()
          }
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
      const tmp_data = {
        "name": this.f.name.value,
        "price": this.f.price.value,
        "discount": this.f.discount.value,
        "categoryId": this.importData.data.id,
        "optionProducts": [
          {
            "name": this.f.nameColor.value,
            "value": this.f.valueColor.value,
          }
        ],
        "description": this.f.description.value
      }

      console.log('data json test', tmp_data)

      this.allService.editData(this.allService.productUrl+'/', tmp_data, this.importData.data.id).subscribe(
        data => {
          console.log('data', data);
          this.isRefreshTable = true;
          // this.ToastrService.typeSuccessEdit();
          this.loaded();

          if (this.selectedImage) {
            const inputData = new FormData();
            inputData.append("files", this.selectedImage);

            this.allService.createData(this.allService.productUrl + '/' + this.importData.data.id + '/images', inputData).subscribe(
                (imageData: any) => {
                  this.ToastrService.typeSuccessEdit()
                  console.log("Image uploaded successfully", imageData);
                },
                (imageError: any) => {
                  console.error("Image upload failed", imageError);
                }
              );
          } else {
            this.ToastrService.typeSuccessEdit()
          }
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
