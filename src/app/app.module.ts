import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { fakeBackendProvider } from './core/interceptor/fake-backend';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { PaymentListComponent } from './pages/payment/payment-list/payment-list.component';
import { PaymentFormComponent } from './pages/payment/payment-form/payment-form.component';
import { UserFormComponent } from './pages/user-role/user-form/user-form.component';
import { UserListComponent } from './pages/user-role/user-list/user-list.component';
import { RoleListComponent } from './pages/user-role/role-list/role-list.component';
import { RoleFormComponent } from './pages/user-role/role-form/role-form.component';
import { ProductFormComponent } from './pages/product/product-form/product-form.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { OrderFormComponent } from './pages/order/order-form/order-form.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { ToastrModule } from 'ngx-toastr';;
import { 
  Home, 
  Tag, 
  Box, 
  ShoppingBag, 
  User, 
  Shield 
} from 'angular-feather/icons';

import { FeatherModule } from 'angular-feather';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const icons = {
  Home, 
  Tag, 
  Box, 
  ShoppingBag, 
  User, 
  Shield 
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    CategoryFormComponent,
    CategoryListComponent,
    PaymentListComponent,
    PaymentFormComponent,
    UserFormComponent,
    UserListComponent,
    RoleListComponent,
    RoleFormComponent,
    ProductFormComponent,
    ProductListComponent,
    OrderFormComponent,
    OrderListComponent,
    UserProfileComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarRouterModule,
    NgScrollbarModule,
    FeatherModule.pick(icons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
  exports: [FeatherModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
