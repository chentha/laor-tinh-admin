import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/core/service/auth.service';
import { environment } from 'environments/environment';
import { TokenService } from './../../core/service/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    // remember: new FormControl(false)
  });

  submitted = false;
  error = '';
  hide = true;
  profile_user: any;
  active_hotel: any;
  none_active_hotel: any;
  loadingRequest = false;
  noAnimate = false;
  showPassword: boolean = false;
  formSubmitted: boolean = false;
  requireChangePsw = false;
  total_record: any;
  tableData: any;
  logo: any;
  token: any;
  user:any;
  keyEncrypt = environment.localEncriptKey;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {

    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/dashboard/main']);
    // }

  }

  ngOnInit() {


  }


  get f() {
    return this.loginForm.controls;
  }

  // Inside your component class
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.submitted) {
      this.submitted = true;
      this.error = '';
      if (this.loginForm.invalid) {
        this.error = 'Username and Password not valid !';
        return;
      } else {
        let tmp_data = {
          "email": this.f.email.value,
          "password": this.f.password.value,
        }
        this.loadingRequest = true;
        localStorage.clear();

        const credentials = btoa(`${environment.Username}:${environment.Password}`);
        const headers = {
            Authorization: `Basic ${credentials}`
        };

        this.authService.login(tmp_data, {headers}).subscribe(
          (data:any) => {
            // this.getDataList()
            localStorage.setItem('card', 'true')
            console.log('login', data)

            // const permission = JSON.stringify(data);
            // const encryptedPermission = this.generalService.encryptFileForLocal(this.keyEncrypt, permission);
            this.token = data.data.accessToken;
            this.user = data.data.user;
            this.tokenService.setValue(this.token)
            localStorage.setItem('user', JSON.stringify(this.user))
            localStorage.setItem('token', this.token)
          
            this.router.navigate(['dashboard/main'])
            this.submitted = false;
   
          },

          err => {
            // this.error = error;
            console.log(err)
            this.submitted = false;
            this.loadingRequest = false;
          }
        );
      }
    }
  }

}