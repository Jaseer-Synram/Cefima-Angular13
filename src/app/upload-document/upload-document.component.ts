import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { first, filter, map, startWith } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  title = this.userService.getDecodedAccessToken(localStorage.getItem("token"))
    .title;
  lastname = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).lastname;

  customerno = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).customerno;
  localdata = JSON.parse(localStorage.getItem("currentUser"));

  // no use found
  // firstname = this.userService.getDecodedAccessToken(localStorage.getItem('token')).firstname;
  COMPANYNAME = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).companyname;
  // loginRole = this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles;
  loginRole = localStorage.getItem("currentActiveRole");
  id = this.userService.getDecodedAccessToken(localStorage.getItem("token")).id;
  documentList: any;
  myControl = new FormControl();
  myControlnew = new FormControl();
  customerFormGroup: FormGroup;
  recordCount: Number;
  customerList: any[];
  optionsValue: any[];
  optionsValuemembers: any[];
  familymembers: any[];
  clickMessage: '';
  error: String;
  componentname: String;
  kundetype: any = '';
  // id: String;
  routeParams: any;
  year: any = new Date().getFullYear();
  ShowButton: boolean = true;
  StpperForm: boolean = false;
  showmembers: boolean = false;
  status: boolean = false;
  filteredOptions: Observable<any>;
  filteredOptionsmembers: Observable<any>;
  selectedUser = {
    id: "",
  };
  currentid = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).id;

  companytype = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).companytype;

  askquestion: FormGroup;
  itemToDisplayUnderKunden = ''
  itemToDisplayUnderDokumenttyp = ''

  //for step 2
  kundevalue = ''
  poa = "false";
  slectedUserCompanyname = "";
  slectedUserTitle = "";
  slectedUserFirstname = "";
  slectedUserLastname = "";

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {
    if (this.loginRole == "b2b") {
    }
    else {
      this.router.navigate(["/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }
  }

  filtercustomer(success, companyName) {
    let newsuccess = [];

    console.log("ddd" + success);
    for (let i = 0; i < success.length; i++) {
      let brokerbrandarray = success[i].brokerbrandarray;
      let brokerarray = success[i].brokerarray;
      let a = brokerbrandarray.indexOf(
        companyName.charAt(0).toUpperCase() + companyName.slice(1)
      );
      console.log("ddd" + i);
      console.log("ddd" + a);

      if (a != -1) {
        let brokervaluenew = brokerarray[a];
        console.log("ddd" + brokervaluenew);
        if (brokervaluenew == this.customerno) {
        } else {
          newsuccess.push(i);
        }
      } else {
        newsuccess.push(i);
        console.log("ddd2" + this.customerno);
      }
    }

    console.log(newsuccess);
    for (let i1 = 0; i1 < newsuccess.length; i1++) {
      delete success[newsuccess[i1]];
      // success.splice(newsuccess[i1],1);
    }
    success = success.filter(function () {
      return true;
    });
    return success;
  }

  ngOnInit() {
    $("#loaderouterid").css("display", "block");
    this.componentname = "documentupload";
    this.routeParams = this.route.snapshot.routeConfig.path;
    this.userService.getCustomers("cefima", true).subscribe((success: any) => {
      $("#loaderouterid").css("display", "none");
      console.log("documentupload" + JSON.stringify(success));
      this.onGetTaxList(success);
    });
  }


  OpenStpper() {
    console.log("ddddddddddd");
    this.StpperForm = true;
    this.router.navigate(['./cefima/new-user'])
  }

  LoopingBroker(data) {
    console.log(data + "LoopingBrokerLoopingBroker")
    let brokerList = [];
    let CustomerData = this.filtercustomer(data, "cefima");
    console.log(CustomerData + "CustomerDataCustomerData");
    for (let i = 0; i < CustomerData.length; i++) {
      if (CustomerData[i].roles.includes("customer")) {
        if (CustomerData[i].title == 'Firma') {
          console.log("customercustomer" + CustomerData[i].title);
          brokerList.push({
            name:
              CustomerData[i].companyname +
              " (" +
              CustomerData[i].customerno +
              ")" +
              " " +
              CustomerData[i].email,
            id: CustomerData[i]._id,
            firstname: CustomerData[i].firstname,
            lastname: CustomerData[i].lastname,
            title: CustomerData[i].title,
            dateofbirth: CustomerData[i].dateofbirth,
            customerno: CustomerData[i].customerno,
          });
        } else {
          console.log("customercustomer" + CustomerData[i].title);
          brokerList.push({
            name:
              //CustomerData[i].firstname +
              "Haushalt" +
              " " +
              CustomerData[i].lastname +
              " (" +
              CustomerData[i].customerno +
              ")" +
              " " +
              CustomerData[i].email,
            id: CustomerData[i]._id,
            firstname: CustomerData[i].firstname,
            lastname: CustomerData[i].lastname,
            title: CustomerData[i].title,
            dateofbirth: CustomerData[i].dateofbirth,
            customerno: CustomerData[i].customerno,
            company_customer: "0",
          });
        }



      }
    }
    console.log("customercustomer" + brokerList);
    return brokerList;
  }
  LoopingBrokermember(data) {
    console.log(data + "LoopingBrokerLoopingBroker")
    let brokerList = [];
    let CustomerData = data;
    console.log(CustomerData + "CustomerDataCustomerData");
    for (let i = 0; i < CustomerData.length; i++) {
      brokerList.push({
        name:
          CustomerData[i].firstname +
          " " +
          CustomerData[i].lastname +
          " (" +
          this.datePipe.transform(CustomerData[i].dateofbirth, 'dd.MM.yyyy') +
          ")",
        id: CustomerData[i]._id
      });


    }
    console.log("customercustomer" + brokerList);
    return brokerList;
  }
  onGetTaxList(data) {
    this.optionsValue = this.LoopingBroker(data);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    let that = this;
    if (this.optionsValue.length > 0) {
      for (let count = 0; count < this.optionsValue.length; count++) {
        if (this.optionsValue[count].title == "Firma") {


          this.userService.getCustomerCompanies(this.optionsValue[count].id).
            subscribe((companydata: any) => {


              for (let comp_count = 0; comp_count < companydata.length; comp_count++) {
                let temp_company_data = companydata[comp_count];
                temp_company_data.id = companydata[comp_count]._id;
                temp_company_data.name = companydata[comp_count].companyname + " (" + that.optionsValue[count].customerno + ") " + companydata[comp_count].email;
                temp_company_data.title = "Firma";

                this.optionsValue.push(temp_company_data);
              }

              console.log("company data fetched");
              console.log(companydata);

              this.userService.getfamilyMembers(this.optionsValue[count].id).
                subscribe((familydata11: any) => {

                  // for(let family_count = 0;family_count<familydata11.length;family_count++){
                  //   let temp_family_data = familydata11[family_count];
                  //   temp_family_data.id = familydata11[family_count]._id;
                  //   temp_family_data.name = familydata11[family_count].firstname+" "+familydata11[family_count].lastname+" ("+that.optionsValue[count].customerno+") "+familydata11[family_count].email;
                  //   temp_family_data.company_private_customer = "1";

                  //   this.optionsValue.push(temp_family_data);
                  // }   


                  if (familydata11.length > 0) {
                    let temp_family_data = familydata11[0];
                    temp_family_data.id = that.optionsValue[count].id;
                    temp_family_data.name = " Haushalt " + familydata11[0].lastname + " (" + that.optionsValue[count].customerno + ") " + familydata11[0].email;

                    temp_family_data.company_customer = "1";

                    this.optionsValue.push(temp_family_data);
                  }

                  this.filteredOptions = this.myControl.valueChanges.pipe(
                    startWith(""),
                    map(value => this._filter(value))
                  );
                });

            });


        }
      }
    }




    //this.optionsValue = data;


    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(""),
    //   map(value => this._filter(value))
    // );
  }
  onGetTaxListmember(data) {
    this.optionsValuemembers = this.LoopingBrokermember(data);
    //this.optionsValue = data;
    this.filteredOptionsmembers = this.myControlnew.valueChanges.pipe(
      startWith(""),
      map(value => this._filtermember(value))
      // map(value => value.length >= 1 ? this._filter(value) : [])
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.optionsValue.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  private _filtermember(value: string) {
    const filterValue = value.toLowerCase();

    return this.optionsValuemembers.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  GoNext() {


    if (this.kundetype == 'Firma' && this.myControl.value) {
      console.log('firma');
      this.kundevalue = this.myControl.value.split('(')[0].trim()
      this.userService.savelocaldata(this.kundetype, this.myControl.value.split('(')[0].trim());
    } else if (this.kundetype.includes('Haushalt') && this.myControlnew.value) {
      console.log('hauhsalt');
      this.kundevalue = this.myControlnew.value.split('(')[0].trim()
      this.userService.savelocaldata(this.kundetype, this.myControlnew.value.split('(')[0].trim());
    }

    // this.router.navigate(["/upload-document/" + this.id], {
    //   queryParams: { user_id: this.id }
    // });
  }

  patchnationalityValue(event) {
    console.log(this.optionsValue);
    this.myControlnew.reset();
    if (this.myControl.value != "") {

      for (let i = 0; i < this.optionsValue.length; i++) {
        if (this.optionsValue[i].name === this.myControl.value) {
          this.id = this.optionsValue[i].id;
          if (this.optionsValue[i].title == 'Firma') {
            this.kundetype = 'Firma';
            console.log("patchnationalityValue" + this.optionsValue[i].title + "if");
            this.showmembers = false;
            this.ShowButton = false;
          } else {
            this.kundetype = 'Haushalt ' + this.optionsValue[i].lastname;
            console.log("patchnationalityValue" + this.optionsValue[i].title + "else");

            $("#loaderouterid").css("display", "block");
            this.userService.getfamilyMembers(this.id)
              .pipe(first())
              .subscribe(

                (familydata11: any) => {
                  $("#loaderouterid").css("display", "none");


                  let selected_customer = this.optionsValue[i];

                  selected_customer._id = selected_customer.id;

                  console.log("look familydata");
                  console.log(familydata11);

                  //familydata11.push(selected_customer);
                  if (selected_customer.company_customer != "1") {
                    familydata11.unshift(selected_customer);
                  }



                  this.familymembers = familydata11;
                  if (this.familymembers.length > 0) {
                    this.showmembers = true;
                    this.onGetTaxListmember(this.familymembers);
                  } else {
                    this.showmembers = false;
                    this.ShowButton = false;

                  }
                })
          }

        }
      }

    } else {
      this.ShowButton = true;
      this.showmembers = false;
      this.familymembers = [];
      this.kundetype = '';
    }

    let words = this.myControl.value.split(' ');
    words.pop();
    this.itemToDisplayUnderKunden = words.join(' ')

    console.log("patchnationalityValue" + this.myControl.value, this.id);
  }
  patchmembervalue(event) {
    console.log(this.optionsValue);
    if (this.myControlnew.value != "") {
      for (let i = 0; i < this.optionsValuemembers.length; i++) {
        if (this.optionsValuemembers[i].name === this.myControlnew.value) {
          this.id = this.optionsValuemembers[i].id;
          console.log("patchmembervalue" + JSON.stringify(this.optionsValuemembers[i]));
        }
      }
      this.ShowButton = false;
    } else {
      this.ShowButton = true;
    }


    console.log("patchmembervalue" + this.myControlnew.value, this.id);
  }
  // logout() {
  //   localStorage.removeItem("token");
  //   this.router.navigate(["./"]);
  //   document.body.classList.remove("modal-open");
  // }
  // isLoggedIn() {
  //   let redirectionRoute = this.authService.checkRouteRedirect(this.loginRole);
  //   this.router.navigate([redirectionRoute]);
  // }
  // navigateWithb2bID() {
  //   console.log("sele" + JSON.stringify(this.selectedUser));

  //   this.router.navigate(["/b2b-dashboard"], {
  //     queryParams: { id: this.id },
  //   });

  //   // this.queryID = this.selectedUser.customerno;
  //   // this.ngOnInit()
  // }


  // second step

  // from oninit
  // this.selectedUser.id = this.id;
  //this.userService.getEditUser(this.user_id).subscribe((success: any) => {
  //   console.log("slectedUserCompanyname" + JSON.stringify(success));
  //   console.log("slectedUserCompanyname" + success.companyname);
  //   console.log("slectedUserCompanyname" + success.title);
  //   console.log("slectedUserCompanyname" + this.slectedUserTitle);
  //   this.slectedUserTitle = success.title;
  //   this.slectedUserFirstname = success.firstname;
  //   this.slectedUserLastname = success.lastname;
  //   this.slectedUserCompanyname = success.companyname;
  // });
  // this.userService
  //     .getgeneraldocumentbycustomeridwithpoa(
  //       this.user_id,
  //       "Allgemeines Dokument",
  //       "Power of attorney"
  //     )
  //     .subscribe((successdata: any) => {
  //       console.log("ddddddd" + successdata.length);
  //       if (successdata.length > 0) {
  //         this.poa = "true";
  //       } else {
  //         this.poa = "false";
        //// }
        //// console.log(success.title);
        //// this.slectedUserTitle = success.title;
        //// this.slectedUserFirstname = success.firstname;
        //// this.slectedUserLastname = success.lastname;
      // });

    //// this.activatedRoute.queryParams.subscribe((params) => {
    ////   console.log(params); // { order: "popular" }
    ////   console.log(params.user_id); // popular
    //// });
    // this.routeParams = this.activatedRoute.snapshot.routeConfig.path;

    GoNext2(document_type: string) {
      this.router.navigate(
        ["/upload-document/" + this.id + "/" + document_type],
        { queryParams: { document_type: document_type, user_id: this.id } }
      );
    }
  

  
}
