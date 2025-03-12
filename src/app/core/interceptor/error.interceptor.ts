import { AuthService } from '../service/auth.service';
import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { GeneralFunctionService } from '../service/general-function.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService,
    private AllFunction : GeneralFunctionService,
    public dialog: MatDialog,) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => { 
        if (err.status === 401 || err.status == 0) {
          // auto logout if 401 response returned from api 
          this.dialog.closeAll();
          this.authenticationService.logout();
          // location.reload(true);
        }
        else if (err.status === 400 || err.status === 409 || err.status === 404){
          // this.AllFunction.toastrService.typeErrorCreate();
        } 
        else if (err.status === 500){
          // this.AllFunction.toastrService.typeErrorCreate()
          // this.AllFunction.toastrService.typeError("Opp, something went wrong!, pls contact administrator",
          // "Opp, something went wrong!, pls contact administrator");
        }
        else{
          // this.AllFunction.toastrService.typeGenealError();
        }
        

        // const error = err.error.message || err.statusText;
        const error = err
        return throwError(error);
      })
    );
  }
}
 