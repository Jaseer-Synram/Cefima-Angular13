import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFullpageModule } from "@fullpage/angular-fullpage";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { PasswordStrengthMeterModule } from "angular-password-strength-meter";
// import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatRippleModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { CarouselModule } from "ngx-owl-carousel-o";
import { MatRadioModule } from "@angular/material/radio";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RecaptchaModule } from "ng-recaptcha";
import { SortDirective } from "../directive/sort.directive";
import { SortPipe } from "../sort.pipe";
// import { PrivateCompanyKundeRegistrationComponent } from '../private-company-kunde-registration/private-company-kunde-registration.component';
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
// import { NotificationComponent } from '../notification/notification.component';
// import { RouterSelectComponent } from '../router-select/router-select.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CefimaLoginComponent } from "../cefima-login/cefima-login.component";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from "@angular/material/expansion";
import { SignaturePadModule } from "angular2-signaturepad";

import { NgxMatDatetimePickerModule, NgxMatNativeDateModule,NgxMatTimepickerModule, } from "@angular-material-components/datetime-picker";
// import { NgxMatTimepickerModule } from "@angular-material-components/datetime-picker/public-api";

@NgModule({
  declarations: [
    SortPipe,
    SortDirective,
    // PrivateCompanyKundeRegistrationComponent,
    // NotificationComponent,
    // RouterSelectComponent,
    // CefimaLoginComponent,
    // DatePipe,
  ],
  exports: [
    CommonModule,
    AngularFullpageModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    PasswordStrengthMeterModule,
    MatRippleModule,
    MatProgressBarModule,
    CarouselModule,
    MatRadioModule,
    MatAutocompleteModule,
    GooglePlaceModule,
    MatInputModule,
    FlexLayoutModule,
    RecaptchaModule,
    ClipboardModule,
    MatDialogModule,
    MatDatepickerModule,
    TabsModule,
    SortPipe,
    SortDirective,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    // SignaturePad,
    SignaturePadModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  // providers: [DatePipe],
})
export class SharedModule {}
