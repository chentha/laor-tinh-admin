import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllService } from '@core/service/allApi.service';
import { GeneralFunctionService } from '@core/service/general-function.service';
import { NGXToastrService } from '@core/service/toast.service';
import { CategoryFormComponent } from 'app/pages/category/category-form/category-form.component';
import { environment } from 'environments/environment.development';

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
    categoryId: new FormControl('', Validators.required),
    optionSizes: new FormControl(''),
    optionColors: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl('', Validators.required)
  })
  selectedImage: any[] = [];
  sizeArray: any[] = [];
  colorArray: any[] = [];
  uploadFiles: File[] = [];

  allTab = ['Info Product', 'Image Product']
  activeTab = [true, false]
  activeIndex = 0;
  documentData: any[] = [];
  allSize: any[] = [];
  allColor: any[] = [];
  optionSizes: any[] = [];
  optionColor: any[] = [];
  url = environment.baseAPI

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDetail: any,
    public allFunction: GeneralFunctionService,
    private allService: AllService,
    private ToastrService: NGXToastrService,
    private cdr: ChangeDetectorRef,
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
      // this.getImageUrl(this.importData);

    }
  }

  ngOnInit() {
    this.getAllCate();
  }

  get f() {
    return this.inputGroup.controls
  }


  //size
  onSizeChange(event: any) {
    const sizeValue = this.inputGroup.get('optionSizes')?.value?.trim();
    if (sizeValue) {
      this.optionSizes.push(sizeValue);
      this.inputGroup.get('optionSizes')?.setValue('');
    }
  }

  removeSize(index: number) {
    this.optionSizes.splice(index, 1);
  }


  //color
  onColorChange(event: any) {
    const colorValue = this.inputGroup.get('optionColors')?.value?.trim();
    if (colorValue) {
      this.optionColor.push(colorValue);
      this.inputGroup.get('optionColors')?.setValue('');
    }
  }

  removeColor(index: number) {
    this.optionColor.splice(index, 1);
  }



  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = Array.from(input.files); 
      this.processFiles(input.files);
    }
    // else {
    //   this.isFileSelected = false;
    // }
  }

  processFiles(files: FileList): void {
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const fileData = {
          document: e.target.result, // base64 or object URL
          fileName: file.name,
          owner: 'User',
          status: 'pending',
          progress: 0,
          size: file.size,
          formattedSize: this.formatFileSize(file.size),
        };

        console.log('data file', fileData)
        this.documentData.push(fileData);
        console.log('document data', this.documentData)
      };

      reader.readAsDataURL(file); // convert to base64
    });
  }

  removeImage(index: number): void {
    this.documentData.splice(index, 1);       // remove from preview array
    this.selectedImage.splice(index, 1);     // remove from actual upload array
  }



  formatFileSize(size: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }


  getAllCate() {
    this.allService.getAllData(this.allService.categoryUrl).subscribe(
      (data: any) => {
        this.cateList = data.data;
        console.log('data', this.cateList)
      }
    )
  }


  tabChange(tab: any) {
    this.activeTab[tab.index] = true;
    // this.showUploadNewFile = true;
    if (tab.index === 0) {

    }
    if (tab.index === 1) {

    }
  }

  activeTabChang(tabInd: number) {
    this.activeTab[tabInd] = false;
    this.cdr.detectChanges();
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
    this.f.quantity.setValue(this.importData.data.inStock)
    this.documentData = this.importData.data?.images;
    const optionProduct = this.importData.data.optionProducts?.[0];
    this.optionSizes = optionProduct?.sizes;
    this.optionColor = optionProduct?.colors;

    console.log('data log ', this.optionSizes)
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
        "optionSizes": this.optionSizes.map(item => ({
          value: item
        })),
        "optionColors": this.optionColor.map(item => ({
          value: item
        })),
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

          if (this.selectedImage && this.selectedImage.length > 0) {
            const inputData = new FormData();
            
            this.selectedImage.forEach((file: File) => {
              inputData.append('files', file); 
            });
          
            this.allService.createData(`${this.allService.productUrl}/${ProdID}/images`, inputData).subscribe(
              (imageData: any) => {
                this.ToastrService.typeSuccessCreate();
                console.log("Image uploaded successfully", imageData);
              },
              (imageError: any) => {
                console.error("Image upload failed", imageError);
              }
            );
          } else {
            this.ToastrService.typeSuccessCreate();
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
        "categoryId": this.f.categoryId.value,
        "quantity": this.f.quantity.value,
        "optionSizes": this.optionSizes.map(item => ({
          value: item?.value || item
        })),
        "optionColors": this.optionColor.map(item => ({
          value: item?.value || item
        })),
        "description": this.f.description.value
      }

      console.log('data json test', tmp_data)
      this.allService.editData(this.allService.productUrl + '/', tmp_data, this.importData.data.id).subscribe(
        data => {
          console.log('data', data);
          this.isRefreshTable = true;
          // this.ToastrService.typeSuccessEdit();
          this.loaded();

          if (this.selectedImage && this.selectedImage.length > 0) {
            const inputData = new FormData();
            
            this.selectedImage.forEach((file: File) => {
              inputData.append('files', file);
            });

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
