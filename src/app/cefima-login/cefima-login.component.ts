import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "../auth.service";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators, 
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { UserService } from "../user.service";
import * as $ from "jquery";
import { async } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { log } from "console";

@Component({
  selector: "app-cefima-login",
  templateUrl: "./cefima-login.component.html",
  styleUrls: ["./cefima-login.component.css"],
})
export class CefimaLoginComponent implements OnInit {
  @Input() ppid: any;
  enableCaptcha: boolean = false;
  forgotpass: boolean = false;
  captchaError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  showPassword: boolean = false;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  showsucc: String = "";
  showErr1: String = "";
  submitted = false;
  loading = false;
  loginSuccess = true;
  loginError = false;
  loginPhoneError = false;
  data: any;
  token: any;
  forgotLink = false;
  error = "";
  message = "";
  forgotPasswordFormShow = false;
  // loginid = this.userService.getDecodedAccessToken(localStorage.getItem("token")).id;
  documentList: any;
  id: String = "";
  captcha = "";
  resolvedcefima(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = captchaResponse;
  }

  showCaptcha = true;

  grecaptcha: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    if (window) {
      if (
        window.location.host.includes("localhost")
        // ||
        // window.location.host.includes(
        //   "ec2-18-197-17-51.eu-central-1.compute.amazonaws.com"
        // )
      ) {
        // this.enableCaptcha = false;
      }
    }
  }
  showloginpopup() {
    console.log("ggggggggggggg");
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
    });

    // if (
    //   window.location.host.includes("localhost") ||
    //   window.location.host.includes(
    //     "ec2-18-197-17-51.eu-central-1.compute.amazonaws.com"
    //   )
    // ) {
    //   this.showCaptcha = false;
    // }
  }

  get f() {
    return this.loginForm.controls;
  }
  get for() {
    return this.forgotPasswordForm.controls;
  }

  newfunction() {
    this.forgotPasswordFormShow = false;
    this.loginError = false;
    this.forgotLink = false;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log("modal close triggered");
  }

  forgotPassword() {
    this.forgotPasswordFormShow = true;
    this.loginError = false;
    //this.router.navigate(['./forgot-password']);
  }
  setState() {
    this.forgotPasswordFormShow = false;
    this.loginError = false;
    this.forgotLink = false;
  }
  public next() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return this.router.navigate(["./"]);
    }
    this.loading = true;
    if (this.f["username"].value) {
      
      this.authService
        .checkEmail(this.forgotPasswordForm.value.username)
        .pipe(first())
        .subscribe((data: any) => {
          if (data["status"] == 200) {
            //this.loginSuccess=true;
            console.log(data);
            this.showsucc = data["msg"];
            this.authService
              .sendLinkForgotPassword(this.forgotPasswordForm.value.username)
              .pipe(first())
              .subscribe(
                (data: any) => {
                  console.log("data", data);
                  if (data["status"] == 200) {
                    this.loginSuccess = true;
                    this.showsucc = data["msg"];
                    console.log(this.showsucc);
                    this.data = data;
                  }
                },
                (error) => {
                  this.loginPhoneError = true;

                  //this.showErr1 = error.message;
                  if (
                    error.message ==
                    "Ungültiger Benutzername und oder Passwort S"
                  ) {
                    this.showErr1 =
                      "Ungültiger Benutzername oder falsches Passwort";
                  } else {
                    this.showErr1 = error.message;
                  }
                  console.log("Error", error["error"]);
                  this.router.navigate(["./"]);
                }
              );
          } else {
            this.loginError = true;
            this.loginSuccess = false;
          }
        });
    }
  }
  check_domain() {
    if (
      !window.location.host.includes("localhost") ||
      !window.location.host.includes(
        "ec2-3-66-32-132.eu-central-1.compute.amazonaws.com"
      )
    ) {
      return false;
    }
    return true;
  }

  login() {

    console.log("check");
    if (this.f["username"].value == "") {
      this.emailError = true;
    } else if (this.f["password"].value == "") {
      this.passwordError = true;
    } else if (
      !window.location.host.includes("localhost") &&
      !window.location.host.includes(
        "ec2-3-66-32-132.eu-central-1.compute.amazonaws.com"
      ) &&
      this.captcha == ""
    ) {
      this.captchaError = true;
    } else {
      if (this.loginForm.invalid) {
        return false;
      }

      this.loading = false;
      // console.log(this.f["username"].value, this.f["password"].value);
      this.authService
        .login(this.f["username"].value, this.f["password"].value)
        .pipe(first())
        .subscribe(
          (dataUSER: any) => {
            localStorage.removeItem("foo");

            // console.log(dataUSER);
            this.token = dataUSER["token"];
            localStorage.setItem("token", this.token);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(dataUSER["user"])
            );

            localStorage.setItem("UserType", "ProductAndSpecialist");

            let localData = JSON.parse(localStorage.getItem("currentUser")!);
            // console.log("localData" , localData);
            let decodedData = this.userService.getDecodedAccessToken(
              localStorage.getItem("token")!
            );
            
            $(".modal-backdrop").removeClass("modal-backdrop");
            $("#loginModalClose1").trigger("click");
            $("#loginModalClose2").trigger("click");
            if (
              localData.companies_with_roles &&
              localData.companies_with_roles.includes("cefima_b2b")
            ) {
              localStorage.setItem("currentActiveRole", "b2b");
            } else if (
              localData.companies_with_roles &&
              localData.companies_with_roles.includes("cefima_customer")
            ) {
              localStorage.setItem("currentActiveRole", "customer");
              
            } else if (localData.TypeOfUser == "Specialist") {
              
            }
            console.log('fromlocal',localData.frontend_home_page,'brand,',environment.brand_id);
            
            let urlRed =  localData.frontend_home_page.find(x => x.id == environment.brand_id)?.url
            console.log('urlRed',urlRed);
            
            $("body").css("padding-right", "0px");
            console.log('nav');
            
            this.router.navigate(["./cefima"]);
          },

          (error) => {
            this.loginError = true;
            this.forgotLink = true;
            //this.showErr1 = error;
            if (error == "Ungültiger Benutzername und oder Passwort S") {
              this.showErr1 = "Ungültiger Benutzername oder falsches Passwort";
            } else {
              this.showErr1 = error;
            }
            this.error = error;
            console.log(error["message"]);
            console.log(error);

            this.router.navigate(["./cefima"]);
          }
        );
    }
  }

  HideAndShow() {
    console.log("ravi");
    if (this.showPassword == false) {
      this.showPassword = true;
    } else {
      this.showPassword = false;
    }
  }
}
