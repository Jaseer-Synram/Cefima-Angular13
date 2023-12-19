import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { DataPolicyComponent } from './data-policy/data-policy.component';
// import { MainDataComponent } from './main-data/main-data.component';
// import { PrivateCompanyKundeRegistrationComponent } from './private-company-kunde-registration/private-company-kunde-registration.component';
// import { RegisterSpecialistUserComponent } from './register-specialist-user/register-specialist-user.component';
// import { RegisterUserComponent } from './register-user/register-user.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'data-policy',
    component: DataPolicyComponent,
  },
  {
    path: 'cefima',
    loadChildren: () =>
      import('./main-layout/main-layout.module').then(
        (m) => m.MainLayoutModule
      ),
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'register-user/:id',
  //   component: RegisterUserComponent,
  //   //data: { roles: [] }
  // },
  // {
  //   path: 'registerspecialistuser/:id',
  //   component: RegisterSpecialistUserComponent,
  // },
  // {
  //   path: 'Vorregistrierung',
  //   loadChildren: () =>
  //     import('./user-registration/user-registration.module').then(
  //       (m) => m.UserRegistrationModule
  //     ),
  // },
  // {
  //   path: 'specialistcase',
  //   loadChildren: () =>
  //     import('./specialist-case/specialist-case.module').then(
  //       (m) => m.SpecialistCaseModule
  //     ),
  // },
  // {
  //   path: 'add-specialist',
  //   loadChildren: () =>
  //     import('./add-specialist/add-specialist.module').then(
  //       (m) => m.AddSpecialistModule
  //     ),
  // },
  // {
  //   path: 'productpartner-chat',
  //   loadChildren: () =>
  //     import('./productpartner-chat/productpartner-chat.module').then(
  //       (m) => m.ProductpartnerChatModule
  //     ),
  // },
  // {
  //   path: 'Kunde-registration',
  //   loadChildren: () =>
  //     import('./kunde-registration/kunde-registration.module').then(
  //       (m) => m.KundeRegistrationModule
  //     ),
  // },

  // {
  //   path: 'Kunde-registration/:customer',
  //   component: PrivateCompanyKundeRegistrationComponent,
  //   //data: { roles: [] }
  // },

  // {
  //   path: 'b2b-dashboard',
  //   loadChildren: () =>
  //     import('./b2b-dashboard/b2b-dashboard.module').then(
  //       (m) => m.B2bDashboardModule
  //     ),
  // },

  // {
  //   path: 'register-link-expired',
  //   loadChildren: () =>
  //     import('./register-link-expired/register-link-expired.module').then(
  //       (m) => m.RegisterLinkExpiredModule
  //     ),
  // },
  // {
  //   path: 'reset-password/:id',
  //   component: ResetPasswordComponent,
  //   //data: { roles: [] }
  // },
  // {
  //   path: 'already-registered',
  //   loadChildren: () =>
  //     import('./already-registered/already-registered.module').then(
  //       (m) => m.AlreadyRegisteredModule
  //     ),
  // },
  // {
  //   path: 'already-registerednew',
  //   loadChildren: () =>
  //     import('./already-registered-new/already-registered-new.module').then(
  //       (m) => m.AlreadyRegisteredNewModule
  //     ),
  // },
  // {
  //   path: 'produktwelt',
  //   loadChildren: () =>
  //     import('./add-product/add-product.module').then(
  //       (m) => m.AddProductModule
  //     ),
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: () =>
  //     import('./forgot-password/forgot-password.module').then(
  //       (m) => m.ForgotPasswordModule
  //     ),
  // },
  // {
  //   path: 'edit-user/:id',
  //   loadChildren: () =>
  //     import('./edit-user/edit-user.module').then((m) => m.EditUserModule),
  // },
  // {
  //   path: 'e-sign',
  //   loadChildren: () =>
  //     import('./e-sign/e-sign.module').then((m) => m.ESignModule),
  // },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
