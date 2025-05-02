import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXToastrService } from '../../core/service/toast.service';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import * as moment from 'moment';
// import * as CryptoJS from 'crypto-js'; // npm i crypto-js
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralFunctionService {

  changePswParams = 'isChange'
  allPage = [10, 20, 50, 100]
  searchDelay = 1800 // 3s

  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription = new Subscription;
  closeDelaySmall = 550; 

  private subject = new Subject<any>();
  private subjectProfile = new Subject<any>();

  month = ("0" + (new Date().getMonth() + 1)).slice(-2)
  currentDate = new Date().getFullYear() + "-" +
    this.month + "-" +
    new Date().getDate()


  constructor(public translate: TranslateService,
    public dialog: MatDialog,
    public toastrService: NGXToastrService
  ) {

  }


  removeValueFromArray(incomeArray: any, toRemoveValue: any): void {
    const index = incomeArray.indexOf(toRemoveValue);
    if (index !== -1) {
      incomeArray.splice(index, 1);
    }
    return incomeArray
  }

  closeDialog(form_name: any) {
    document
      .getElementsByClassName(form_name)[0]
      .classList.remove("animate__slideInLeft");
    document
      .getElementsByClassName(form_name)[0]
      .classList.add("animate__slideOutRight");
  }

  dialogData(size: 'medium' | 'large' | 'extra large', type?: 'add' | 'edit' | 'reset' | 'view', form_name?: any, data?: any) {
    let width = '100%'
    if (size == 'medium') { width = '500px' }
    else if (size == 'large') { width = '1000px' }
    else if (size == 'extra large') { width = '1200px' }
    let tmp_data: any = {
      width: width,
      height: "100%",
      position: { right: '0' },
      disableClose: true,
      data: {
        type: type,
        form_name: form_name,
        data: data || null
      },
      // panelClass: ["my_popup_slide" , "my_slide_left", "max-width-95"]
      panelClass: [form_name, "animate__animated", "animate__slideInRight", "m-w-100", "animate_duration_0_5"]
    };
    return tmp_data
  }

  askingText(type: 'delete' | 'update' | 'create' | 'edit' | 'disable' | 'enable' | 'assign') {
    let deleteText = 'You want to delete this data?'
    let createText = 'You want to create this data?'
    let updateText = 'You want to update this data?'
    let assignText = 'You want to assign this data?'
    let disableText = 'You want to disable this account?'
    let enableText = 'You want to enable this account?'
    let editText = 'You want to edit this data?'
    let deleteTextKh = 'អ្នកចង់លុបទិន្នន័យនេះ'
    let createTextKh = 'អ្នកចង់បង្កេីតទិន្នន័យនេះ'
    let updateTextKh = 'អ្នកចង់កែប្រែទិន្នន័យនេះ'
    let disableTextKh = 'អ្នកចង់បិតដំណើរការគណនីនេះ'
    let enableTextKh = 'អ្នកចង់បើកដំណើរការគណនីនេះ'
    let tmp_text: any = {
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'bg-primary',
      },
      showCancelButton: true
    }

    if (type == 'delete') { tmp_text.text = deleteText }
    else if (type == 'update') { tmp_text.text = updateText }
    else if (type == 'create') { tmp_text.text = createText }
    else if (type == 'assign') { tmp_text.text = assignText }   
    else if (type == 'disable') { tmp_text.text = disableText }
    else if (type == 'enable') { tmp_text.text = enableText }
    else if (type == 'edit') { tmp_text.text = editText }

    if (localStorage.getItem('lang') && localStorage.getItem('lang') == 'kh') {
      tmp_text.title = 'តេីអ្នកប្រាកដឬទេ?'
      if (type == 'delete') { tmp_text.text = deleteTextKh }
      else if (type == 'update') { tmp_text.text = updateTextKh }
      else if (type == 'create') { tmp_text.text = createTextKh }
      else if (type == 'assign') { tmp_text.text = assignText }   
      else if (type == 'disable') { tmp_text.text = disableTextKh }
      else if (type == 'enable') { tmp_text.text = enableTextKh }
      else if (type == 'edit') { tmp_text.text = updateTextKh }
    }
    return tmp_text
  }

  //For check in select if select don't have object will push to array
  addSelectIfNoHave(allArray: any, object: any) {
    if (object == null) {
      return allArray
    }
    else {
      let tmp_findObject = allArray.filter((it: { id: any; }) => { return it.id == object.id })
      if (tmp_findObject.length == 0) {
        tmp_findObject = allArray;
        tmp_findObject.push(object)
        return tmp_findObject;
      }
      else {
        return allArray;
      }

    }
  }

  checkContainsSpecialChars(str: string) {
    const normalChars = /[A-Za-z]/;
    const normalNumber = /[0-9]/;
    const specialChars = /[!@#$%^&*]/;
    if (normalChars.test(str) && normalNumber.test(str) && specialChars.test(str)) {
      return false
    }
    return true;
  }


  //change value to date format
  formatDateFormat(value: any) {
    if (value != null) {
      return moment(value).format('YYYY-MM-DD')
    }
    return null
  }

  formatDateYearLast(value: any) {
    return moment(value).format('DD-MM-YYYY')
  }

  onFirstComponentButtonClick() {
    this.invokeFirstComponentFunction.emit();
  }


  //Event Click for component want to call
  sendClickEvent() {
    this.subject.next(true);
  }


  //Event get click for component that want the function to work
  getEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  //Event Click for component want to call
  sendClickEventProfile() {
    this.subjectProfile.next(true);
  }

  //Event get click for component that want the function to work
  getEventProfile(): Observable<any> {
    return this.subjectProfile.asObservable();
  }


  //Check Time To Return good morning status [ current time = new Date().getHours() ]
  checkTimeMessage(currentTime: number) {
    if (currentTime < 12) {
      return 'Good Morning';
    } else if (currentTime >= 12 && currentTime <= 17) {
      return 'Good Afternoon';
    } else (currentTime > 17 && currentTime <= 24)
    return 'Good Evening';
  }


//   checkRememberPassword() {
//     const encryptedCredentials = localStorage.getItem('credentials');
//     if (encryptedCredentials) {
//       return this.decryptFileForLocal(environment.localEncriptKey ,encryptedCredentials);
//     }
//     return null;
//   }

  // setUsernameAndPassword(username: string, password: string) {
  //   const credentials = { username, password };
  //   const encryptedCredentials = CryptoJS.AES.encrypt(JSON.stringify(credentials), 'username_password_secret_key').toString();
  //   localStorage.setItem('credentials', encryptedCredentials);
  // }

  transformDecimal(value: any, percision: any) {
    let finalValue = '';
    let tmp_afterSplit = (value + '.').split('.')
    if (!value || !percision || Number(percision) <= 0 || tmp_afterSplit.length < 2) { return value; }
    // prepare data into variable for return
    finalValue += tmp_afterSplit[0] + '.' + tmp_afterSplit[1].substring(0, percision)
    return Number(finalValue);
  }

  //** method encrypt value */
//   encryptFileForLocal(keys: any, value: any) {
//     var key = CryptoJS.enc.Utf8.parse(keys);
//     var iv = CryptoJS.enc.Utf8.parse(keys);
//     var encryptd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key, {
//       keySize: 128 / 8,
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     return encryptd.toString();
//   }

//   //** method decrypt value */
//   decryptFileForLocal(keys: any, value: any) {
//     if (value != null) {
//       var key = CryptoJS.enc.Utf8.parse(keys);
//       var iv = CryptoJS.enc.Utf8.parse(keys);
//       var decrypted = CryptoJS.AES.decrypt(value, key, {
//         keySize: 128 / 8,
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//       });

//       return decrypted.toString(CryptoJS.enc.Utf8);
//     }
//     else {
//       return null;
//     }
//   }


}