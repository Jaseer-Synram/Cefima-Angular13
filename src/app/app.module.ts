import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { RegisterSpecialistUserComponent } from './register-specialist-user/register-specialist-user.component';
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from "./login/login.component";
// import { PrivateCompanyKundeRegistrationComponent } from './private-company-kunde-registration/private-company-kunde-registration.component';
import { CefimaLoginComponent } from "./cefima-login/cefima-login.component";
// import { RouterSelectComponent } from './router-select/router-select.component';
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptorService } from "./jwt-interceptor.service";
import { JwtModule } from "@auth0/angular-jwt";
// import { RegisterUserComponent } from './register-user/register-user.component';
// import { SortPipe } from './sort.pipe';
// import { SortDirective } from './directive/sort.directive';
import { VideoChatComponent } from "./video-chat/video-chat.component";
import { CallInfoDialogComponents } from "./call-info-dialog/call-info-dialog.component";
import { SocketIoModule } from "ngx-socket-io";
// import { NotificationComponent } from './notification/notification.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { RecaptchaModule } from "ng-recaptcha";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
// import { HomeComponent } from './home/home.component';
import { AuthGuardService } from "./auth-guard.service";
import { HomeComponent } from "./home/home.component";
import { PagerService } from "./_services/index";
import { CompanySelectDialogComponent } from "./company-select-dialog/company-select-dialog.component";
import { DataPolicyComponent } from './data-policy/data-policy.component';

export const MY_FORMATS = {
  parse: {
    dateInput: "DD.MM.YYYY",
  },
  display: {
    dateInput: "DD.MM.YYYY",
    monthYearLabel: "MM YYYY",
    dateA11yLabel: "DD.MM.YYYY",
    monthYearA11yLabel: "MM YYYY",
  },
};
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    // RegisterSpecialistUserComponent,
    LoginComponent,
    CefimaLoginComponent,
    // PrivateCompanyKundeRegistrationComponent,
    // CefimaLoginComponent,
    // RouterSelectComponent,
    // RegisterUserComponent,
    // ResetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    MainLayoutComponent,
    HomeComponent,
    // B2bDashboardComponent,
    // HomeComponent,
    // NotificationComponent,
    VideoChatComponent,
    CallInfoDialogComponents,
    CompanySelectDialogComponent,
    DataPolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    SocketIoModule.forRoot({
      url: "https://fiorettosystems.com",
      options: {
        path: "/api/socket.io",
      },
    }),
    // RecaptchaModule,
    // TabsModule.forRoot(),
    // SignaturePadModule,
  ],
  entryComponents: [VideoChatComponent, CallInfoDialogComponents],
  providers: [
    AuthService,
    UserService,
    DatePipe,
    PagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: "de" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  // exports: [PrivateCompanyKundeRegistrationComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
