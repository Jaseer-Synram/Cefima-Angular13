import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from "@angular/core";
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
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { log } from "console";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { MatStepper } from "@angular/material/stepper";

//final step
type unit = "bytes" | "KB" | "MB" | "GB" | "TB" | "PB";
type unitPrecisionMap = {
  [u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
  bytes: 0,
  KB: 0,
  MB: 1,
  GB: 1,
  TB: 2,
  PB: 2,
};


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
  firstname = this.userService.getDecodedAccessToken(localStorage.getItem('token')).firstname;
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
  ShowButtonTwo: boolean = true
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
  itemToDisplayUnderProdukttyp = ''
  itemToDisplayUnderProduktPartner = ''


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
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    if (this.loginRole == "b2b") {
    }
    else {
      this.router.navigate(["/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }
  }


  onStepChange(event: StepperSelectionEvent) {
    console.log(event.selectedStep);

    if (event.selectedIndex === 3) {

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
    this.route.queryParams.subscribe(params => {
      const user_id = params['user_id']
      console.log(user_id);
    })
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
    console.log(JSON.stringify(data) + "LoopingBrokerLoopingBroker")
    let brokerList = [];
    let CustomerData = data;
    console.log(JSON.stringify(CustomerData) + "CustomerDataCustomerData");
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
    console.log("customercustomer" + JSON.stringify(brokerList));
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
      map(value => {
        console.log(value);
        return this._filtermember(value)
      })
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
                    this.ShowButton = false;
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
      console.log('true1');
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
      this.ShowButtonTwo = false
      this.ShowButton = false;
    } else {
      console.log('true2');

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


  // second step *************

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
    this.itemToDisplayUnderDokumenttyp = document_type
    console.log(document_type);
    this.document_type = document_type
    setTimeout(() => {
      $('#movetonextstep').trigger("click");
    }, 100);

    this.initToProducctPartner()
    // this.router.navigate(
    //   ["/upload-document/" + this.id + "/" + document_type],
    //   { queryParams: { document_type: document_type, user_id: this.id } }
    // );
  }

  //step 3 : product type *************

  productsOptionsOne: string[] = [
    "Private Haftpflichtversicherung",
    "Hausratversicherung",
    "Glasversicherung",
    "Rohngebaudeversicherung",
    "reiseversicherung",
    "Tierhalterhaftplicht",
    "Sterbegeldversicherung",
    "Berufshaftpflichtversicherung",
    "Rechtsschutzversicherung",
    "Restschuldversicherung",
    "Unfallversicherung",
    "Kfz kaskoversicherung",
    "Private krankenversicherung",
    "Gesetzliche krankenversicherung",
    "Schwere krankheiten_vorsorgeversicherung",
    "Private Rentenversicherung",
    "Lebensversicherung",
    "Riester Rente",
    "Basisrente",
    "Betriebliche Altersversorgung",
    "Berufsunfahigkeitsversicherung",
  ];
  ThirdTypeDocList: string[] = [
    "Erstinformation",
    "Datenschutzeinwilligung",
    "Personalausweis",
    "Reisepass",
    "Fuhrerschein",
    "Vorsorgevollmacht",
    "Betreuungsvollmacht",
    "Patientenverfügung",
    "Sonstiges",
  ];

  ReadyProductsOptions: string[];
  ReadyProductsTypeOptions: string[];
  filteredProductsOptions: Observable<any>;
  filteredProductsTypeOptions: Observable<any>;
  ProductsControl = new FormControl();
  ProductsTypeControl = new FormControl();
  ThirdTypeDoc = new FormControl();
  ThirdTypeDocOptions: Observable<any>;
  ShowProductsPartner: boolean = false;
  lastproducttypeid: any = '';
  Links: string;
  routeParams3: any;
  lastproductpartnerid: any = '';
  ShowButtonStep3: boolean = true;

  producttypeselected: any = "";
  productpartnerselected: any = "";
  document_type: string;
  document_sub_type = ''
  document_sub_typename = ''
  product_partner = ''
  // from oninit-step3 found no use

  initToProducctPartner() {
    this.ThirdTypeDocOptions = this.ThirdTypeDoc.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterThirdTypeDoc(value))
    );
    const data = this.userService.getproductpartner().subscribe(
      (success: any) => {
        // if success and error give response
        console.log(JSON.stringify(success))
        this.ReadyProductsOptions = this.LoopingProductsList(success);
        this.ReadyProductsTypeOptions = this.LoopingProductsListType(success);
        console.log("ReadyProductsTypeOptions" + this.ReadyProductsTypeOptions);
        if (success.status == "error") {
          this.error = success.message;
        } else {
          this.customerList = success;
          //this.setPage(1);
          this.recordCount = success.length;
          console.log(this.customerList);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
    setTimeout(() => {
      this.filteredProductsOptions = this.ProductsControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filterstep3(value))
        // map(value => typeof value === 'string' ? value : value.name),
        // map(name => name ? this._filterstep3(name): this.ReadyProductsOptions.slice())
      );

      // this.filteredProductsTypeOptions = this.ProductsTypeControl.valueChanges.pipe(
      //   startWith(""),
      //   map((value) => this._filterTypeProducts(value))
      // );


      this.filteredProductsTypeOptions =
        this.ProductsTypeControl.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterTypeProducts(value))
        );


      console.log(
        "this.filteredProductsTypeOptions" +
        JSON.stringify(this.filteredProductsTypeOptions)
      );
    }, 3000);
  }



  LoopingProductsList(data: string | any[]): string[] {
    let ProductsList = [];
    for (let i = 0; i < data.length; i++) {
      ProductsList.push(data[i].company_name);
    }
    return ProductsList;
  }

  LoopingProductsListType(data: string | any[]): string[] {
    let ProductsList = [];
    // for (let i = 0; i < data.length; i++) {
    //   console.log(data[i]);
    //   for (let j = 0; j < data[i].spartedata.length; j++) {
    //     for (let k = 0; k < data[i].spartedata[j].product_type.length; k++) {
    //       ProductsList.push(data[i].spartedata[j].product_type[k]);
    //     }
    //   }
    // }

    // return [...new Set(ProductsList)];
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].producttypesinfo.length; k++) {
        console.log("sadfasdfasdf" + data[i].producttypesinfo[k].product_typename);
        ProductsList.push({
          "id": data[i].producttypesinfo[k]._id
          , "name": data[i].producttypesinfo[k].product_typename
        });

      }
    }

    // return [...new Set(ProductsList)];
    console.log("ReadyProductsTypeOptions" + [...new Map(ProductsList.map(item =>
      [item['name'], item])).values()]);
    return [...new Map(ProductsList.map(item =>
      [item['name'], item])).values()];

  }

  LoopingProductsListTypePatch(data: string | any[], type: string) {
    let ProductsList = [];

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);

      for (let k = 0; k < data[i].producttypesinfo.length; k++) {
        if (type == data[i].producttypesinfo[k]._id) {
          // this.url= data[i].url;
          ProductsList.push({
            id: data[i]._id,
            name: data[i].company_name,
            url: data[i].url,
          });
        }
      }

    }
    console.log("LoopingProductsListTypePatch" + [...new Set(ProductsList)]);
    return [...new Set(ProductsList)];
  }

  GoToUploadSingleDocument() {

    this.userService.savelocaldata(this.kundetype, this.kundevalue, this.producttypeselected, this.productpartnerselected);
    console.log(this.document_type, ':', this.kundetype, ':', this.kundevalue, ':', this.producttypeselected, ':', this.productpartnerselected);
    console.log(this.ThirdTypeDoc.value, ':', this.ProductsControl.value, ';', this.lastproducttypeid, ':', this.lastproductpartnerid, ':', this.ProductsTypeControl.value);

    if (this.document_type == "Allgemeines Dokument") {
      // this.router.navigate([this.Links], {
      //   queryParams: {
      //     document_sub_type: this.ThirdTypeDoc.value,
      //     user_id: this.id,
      //     document_type: this.document_type,
      //     product_partner: this.ProductsControl.value,
      //   },
      // });
    } else {
      // this.router.navigate([this.Links], {
      //   queryParams: {
      //     document_sub_type: this.lastproducttypeid,
      //     user_id: this.id,
      //     document_type: this.document_type,
      //     product_partner: this.lastproductpartnerid,
      //     document_sub_typename: this.ProductsTypeControl.value,
      //   },
      // });
    }
    setTimeout(() => {
      $('#movetonextstep').trigger("click");
    }, 100);
  }


  private _filterstep3(value: any): string[] {
    console.log("_filter" + JSON.stringify(value));
    console.log(
      "this.ReadyProductsOptions" + JSON.stringify(this.ReadyProductsOptions)
    );
    let filterValue = "";
    if (typeof value == "object") {
      filterValue = value.name.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.ReadyProductsOptions.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterThirdTypeDoc(value: string): string[] {
    console.log("_filter" + value);
    this.document_sub_type = value
    const filterValue = value.toLowerCase();
    return this.ThirdTypeDocList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterTypeProducts(value: string): string[] {
    this.itemToDisplayUnderProdukttyp = value
    this.document_sub_type = value
    console.log("ProductsControl" + value);
    if (typeof value != 'object') {
      const filterValue = value.toLowerCase();

      return this.ReadyProductsTypeOptions.filter((option: any) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
  }

  patchProductValue(event: any) {
    this.itemToDisplayUnderProduktPartner = this.ProductsControl.value.name
    console.log("ProductsControl" + this.ProductsControl.value.name);
    if (this.ProductsControl.value.name != "") {
      if (this.ProductsControl.value.name) {
        this.lastproductpartnerid = this.ProductsControl.value.id;

        this.product_partner = this.ProductsControl.value

        this.productpartnerselected = this.ProductsControl.value.name;

        this.ProductsControl.setValue(this.ProductsControl.value.name)
        this.ShowButtonStep3 = false;
      }
    } else {
      this.ProductsControl.setValue("")
      this.ShowButtonStep3 = true;
    }

    this.Links = `/upload-document/${this.id}/${this.document_type}/${this.lastproducttypeid}`;
  }


  ThirdTypeDocValue() {

    this.producttypeselected = this.ThirdTypeDoc.value;

    console.log("ThirdTypeDoc" + this.ThirdTypeDoc.value);
    if (this.ThirdTypeDoc.value != "") {
      if (this.ThirdTypeDoc.value) {
        console.log("ThirdTypeDoc" + this.ThirdTypeDoc.value);
        this.ShowButtonStep3 = false;
        this.itemToDisplayUnderProdukttyp = this.ThirdTypeDoc.value
        this.document_sub_typename = this.ThirdTypeDoc.value
      }
    } else {
      this.ShowButtonStep3 = true;
    }

    this.Links = `/upload-document/${this.id}/${this.document_type}/${this.ProductsControl.value}`;
  }

  patchProductTpyeValue(event: any) {
    this.ReadyProductsOptions = [];
    console.log("ProductsTypeControl" + this.ProductsTypeControl.value.name);
    this.document_sub_typename = this.ProductsTypeControl.value.name
    this.document_sub_type = this.ProductsTypeControl.value.name
    this.itemToDisplayUnderProdukttyp = this.ProductsTypeControl.value.name
    if (this.ProductsTypeControl.value != "") {
      if (this.ProductsTypeControl.value) {
        this.ShowProductsPartner = true;
        this.ReadyProductsOptions =
          this.LoopingProductsListTypePatch(this.customerList, this.ProductsTypeControl.value.
            id);
        this.lastproducttypeid = this.ProductsTypeControl.value.id;
        console.log("ProductsTypeControl" + this.lastproducttypeid);

        // this.ProductTypeArray.push(this.ProductsTypeControl.value);
        // this.producttypenew.push(this.ProductsTypeControl.value);
        // this.lastproducttypeid=this.ProductsTypeControl.value.id;


        this.producttypeselected = this.ProductsTypeControl.value.name;

        this.ProductsTypeControl.setValue(this.ProductsTypeControl.value.name);
        // this.ShowProductsPartner = true;
      }
    } else {
      this.ShowProductsPartner = false;
    }

    // this.clickpp();

  }

  // final step

  finalShowButton = false

  private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  uploadimage: boolean;
  filearray: any[] = [];
  filearraynew: any[] = [];
  UploadDone: boolean;
  UploadError: boolean;
  showLoader: boolean;
  ShowPop: boolean;
  l = 0;

  fileUpload = { status: "", message: "", filePath: "" };
  inputText: any;
  fn: string = "";
  ln: string = "";
  pdffile: any;


  @ViewChild('stepper') stepper: MatStepper;

  addMoreDocument() {
    if (this.kundetype != 'Firma' && this.myControl.value) {
      this.stepper.selectedIndex = 2
    } else {
      this.stepper.selectedIndex = 1
    }
  }

  goToFirstStep() {
    this.stepper.selectedIndex = 0;
    this.itemToDisplayUnderProduktPartner = ''
    this.itemToDisplayUnderProdukttyp = ''
    this.itemToDisplayUnderDokumenttyp = ''
    this.itemToDisplayUnderDokumenttyp = ''
    // this.itemToDisplayUnderKunden = ''
  }


  uploadDocument(values: any, index: any) {

    this.userService
      .getEditUser(this.id)
      .pipe(first())
      .subscribe((userData) => {
        console.log(userData);
        this.fn = userData.firstname;
        this.ln = userData.lastname;
      });




    let length = this.filearray.length;
    if (length) this.finalShowButton = false;
    $("#loaderouterid").css("display", "block");
    const formData = new FormData();
    formData.append("document_type", values.document_type);
    formData.append("document_sub_type", values.document_sub_type); // product_type
    formData.append("product_partner", values.product_partner);
    formData.append("user", values.user_id);
    formData.append("companycode", values.companycode);
    formData.append("brand", values.brand);
    formData.append("tags", values.tags);
    formData.append("upload_by", values.upload_by);
    formData.append("ticket_no", values.ticket_no);

    if (values.image !== "") {
      formData.append("document", values.image);
    }
    this.UploadDone = true;
    this.userService
      .callApiMultipart(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          //   $("#Success").html(`<div class="alert alert-success" role="alert">
          //   Erfolgreich hochgeladen
          // </div>`);
          //   $("#Success").css("text-align", "center");
          //   $("#Success").css("font-size", "30px");
          console.log("POST Request is successful ", data["_id"]);
          this.UploadDone = true;
        },
        (error) => {
          $("#loaderouterid").css("display", "none");
          this.UploadError = true;
          this.error = error;

          console.log("Error", error);
        },
        () => {
          console.log(length, index);
          if (length == index + 1) {
            $("#loaderouterid").css("display", "none");
            Swal.fire({
              icon: "success",
              title: ` Möchten Sie für den ausgewählten Kunden  ${this.fn} ${this.ln} weitere Dokumente hochladen?`,
              html: `<div style="width:100%">
                <button id="buttonOne"type="button" style="background: #184397" class="btn button-primary">Ja</button>
                <button id="buttonTwo"type="button" class="btn btn-success">Nein</button>
                <button id="buttonThree"type="button" class="btn btn-dark">Neuer Kunde</button>
                </div>`,
              showConfirmButton: false,
            })
              .then((result) => { })
              .catch((err) => { });
            const ButtonOne = document.getElementById("buttonOne");
            ButtonOne.addEventListener(
              "click",
              function () {
                removepreview("one");
              },
              false
            );
            const ButtonTwo = document.getElementById("buttonTwo");
            ButtonTwo.addEventListener(
              "click",
              function () {
                removepreview("two");
              },
              false
            );
            const buttonThree = document.getElementById("buttonThree");
            buttonThree.addEventListener(
              "click",
              function () {
                removepreview("three");
              },
              false
            );
            const removepreview = (e) => {
              if (e == "one") {
                console.log(e);

                // this.router.navigate([`./cefima/upload-document`], {
                //   queryParams: { user_id: this.id },
                // });

                this.addMoreDocument()
                Swal.close();
                this.finalShowButton = false;
              } else if (e == "two") {
                console.log(e);
                // this.router.navigate(["./cefima/upload-document"]);
                this.goToFirstStep()
                Swal.close();
                this.finalShowButton = false;
              } else {
                console.log(e);
                this.router.navigate(["./cefima/new-user/"]);

                Swal.close();
                this.finalShowButton = false;
              }
            };
          }
        }
      );
  }

  _handleImageUpload = () => {
    this.userService
      .getLastdocument()
      .pipe(first())
      .subscribe((data) => {
        console.log("ticket_no" + data);
        var values = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          product_partner: "",
          companycode: "",
          brand: "",
          tags: [],
          upload_by: "",
          ticket_no: "",
        };
        var doc = new jsPDF("p", "pt", "a4", true);
        var width = doc.internal.pageSize.width;
        var height = doc.internal.pageSize.height;
        console.log("_handleImageUpload" + JSON.stringify(this.filearray));
        this.filearray = this.filearray.filter(function () {
          return true;
        });

        for (let i = 0; i < this.filearray.length; i++) {
          //var document_type = "Allgemeines Dokument";
          let url = this.filearray[i];
          let reader = new FileReader();
          let extension = url.name.substr(url.name.lastIndexOf(".") + 1);

          reader.readAsDataURL(url);
          reader.onload = () => {
            // this.fileName = url.name + " " + url.type;
            let base64ImgString = (reader.result as string).split(",")[1];
            if (
              extension == "PDF" ||
              extension == "pdf" ||
              extension == "pdfx" ||
              extension == "docx" ||
              extension == "doc" ||
              extension == "DOCX" ||
              extension == "txt" ||
              extension == "TXT"
            ) {
              let StringTypeCasting = Math.round(this.filearray[i].size / 1024);
              let MainType = this.filearray[i].type;
              let Date = this.filearray[i].lastModified;
              console.log("this.StringTypeCasting " + StringTypeCasting);
              values.image = this.filearray[i];
              values.document_type = this.document_type;
              values.document_sub_type = this.document_sub_type;
              values.user_id = this.id;
              values.product_partner = this.product_partner
                ? this.product_partner
                : " ";
              values.companycode = "42140 DFG Finanzprofi GmbH";
              values.brand = "cefima";
              values.upload_by = "cefima_document";
              values.ticket_no = "40-ce-" + data;

              values.tags.push(StringTypeCasting.toString());
              values.tags.push(MainType);
              values.tags.push(Date);
              this.uploadDocument(values, i);
              values.tags = [];
              this.showLoader = true;
              this.showLoader = false;
              this.ShowPop = true;
              console.log(values);
            } else {
              var widthnew = width - 300;
              var widthnew1 = widthnew / 2;
              var heightnew = height - 180;
              var heightnew1 = heightnew / 2;
              doc.addImage(base64ImgString, 50, 50, width - 100, height - 100);

              if (i == this.filearray.length - 1) {
                //  doc.save("a4.pdf");
                this.pdffile = doc.output("blob");

                console.log(this.pdffile.Size);

                let StringTypeCasting = Math.round(
                  this.filearray[i].size / 1024
                );
                let MainType = this.filearray[i].type;
                //let Date = this.filearray[i].lastModified;
                let typeofimage = "application/pdf";
                let dateofdocument = new Date().getTime();
                values.image = this.pdffile;
                console.log("this.StringTypeCasting " + StringTypeCasting);
                // values.image = this.filearray[i];
                values.document_type = this.document_type;
                values.document_sub_type = this.document_sub_type;
                values.user_id = this.id;
                values.product_partner = this.product_partner
                  ? this.product_partner
                  : " ";
                values.companycode = "42140 DFG Finanzprofi GmbH";
                values.brand = "cefima";
                values.upload_by = "cefima_document";
                values.ticket_no = "40-ce-" + data;

                values.tags.push(StringTypeCasting.toString());
                //values.tags.push(MainType);
                // values.tags.push(Date);
                values.tags.push(typeofimage);
                values.tags.push(dateofdocument);
                this.uploadDocument(values, i);
                values.tags = [];

                console.log(values);
              } else {
                doc.addPage();
              }
            }
          };
        }
        $(".pip").remove();

        // this.finalShowButton = false;

        this.filearraynew = [];
      });
  };

  dataconvert(
    bytes: number = 0,
    precision: number | unitPrecisionMap = defaultPrecisionMap
  ): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return "?";

    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];

    if (typeof precision === "number") {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;
  }

  handleImageChange(event: any) {
    $("#result").html("");
    event.preventDefault();


    const previewData = (source, modaltitle) => {
      console.log("previewData" + source);

      $('#openpreviewmodel').trigger('click');
      this.open_modal('exampleModalpreview')
      //$('#showpreviewpdf').attr('src',this.previewidandsrc[j]);

      $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

      $('#showpreviewdownload').attr('href', source);

      if (source.indexOf('data:application/pdf;') != -1) {
        $('#showpreviewimg').attr('src', '');
        $('#showpreviewimg').css('display', 'none');

        $('#showpreviewpdf').attr('src', '');
        $('#showpreviewpdf').css('display', 'block');
        $('#showpreviewpdf').attr('src', source);
      } else {
        $('#showpreviewpdf').attr('src', '');
        $('#showpreviewpdf').css('display', 'none');

        $('#showpreviewimg').attr('src', '');
        $('#showpreviewimg').css('display', 'block');
        $('#showpreviewimg').attr('src', source);
      }
    };


    const removeData = (j) => {
      console.log(j);

      console.log("dsfsfdsf" + j);
      console.log(this.filearraynew.length);
      console.log(this.filearraynew);
      // this.filearraynew.splice(j, 1);
      delete this.filearraynew[j];
      console.log(this.filearraynew);

      console.log(this.filearraynew.length);

      let newfilearray = this.filearraynew.filter(function () {
        return true;
      });
      if (newfilearray.length > 0) {
        // this.finalShowButton = true;
      } else {
        this.finalShowButton = false;
      }
      console.log("dsfsfdsf" + newfilearray);
      this.filearray = newfilearray;
    };

    var files = event.target.files; //FileList object

    var filesLength = files.length;

    if (filesLength) {
      this.finalShowButton = true;
    }

    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      let newsize = this.l;
      this.l = this.l + 1;
      this.filearraynew.push(f);
      let Size1 = f.size;
      let Size = this.dataconvert(Size1);
      this.filearray = this.filearraynew;
      console.log("this.filearraynew" + this.filearraynew);
      console.log("this.filearray " + this.filearray);

      var fileReader = new FileReader();
      //var target:EventTarget;
      fileReader.onload = function (e) {
        //var file = e.target;

        console.log(f.name.split("."));
        let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
        console.log(extension);
        let ImageName;
        if (extension == "doc" || extension == "docx") {
          ImageName = "../assets/docx.png";
        } else if (extension == "pdf" || extension == "pdfx") {
          ImageName = "../assets/PDF.svg";
        } else {
          ImageName = (e.target as any).result;
        }

        let typeofimage = f.type;
        let dateofdocument = f.lastModified;
        // var d = new Date(dateofdocument);
        // var date =
        // d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

        var d = new Date(dateofdocument).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        var date = d.replace(/[/]/g, ".");

        // let Size = Math.round(f.size / 1024);


        // $(
        //   '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" "id=\'pipremove' +
        //     newsize +
        //     "'>" +
        //     '<div class="removepreview" id="removepreviewid' +
        //     newsize +
        //     '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
        //     "" +
        //     '<img class="imageThumb" style="width: 100%;height:210px" src="' +
        //     ImageName +
        //     '" title="' +
        //     f.name +
        //     '"/>' +
        //     "<div> <b class='limitword' title='" +
        //     f.name +
        //     "'>Dokumentenname: " +
        //     f.name +
        //     "</b> </div><div> <b>Dateigröße: " +
        //     Size +
        //     "</b> </div><div> <b>Dateityp: " +
        //     typeofimage +
        //     "</b> </div><div> <b>Datum des Dokuments: " +
        //     date +
        //     "</b> </div></div>"
        // ).insertAfter("#result");




        // $(
        //   // one s          
        //   '<div class="pip col-md-12 p-0 " style="display: inline-block;margin-top: 8px;" "id=\'pipremove' +
        //   newsize +
        //   "'>" +
        //   // 2 s        
        //   '<div class="col-md-12 p-0 d-flex flex-raw">' +

        //   //  3 s    image
        //   '<div class="col-md-2">' +
        //   '<img class="imageThumb" style="width: 65px;height:30px;margin-top: 20px;" src="' + ImageName + '" title="' + f.name + '"/>' +
        //   //  3 f    
        //   '</div>' +
        //   // 4 s    details
        //   '<div class="col-md-6" style="font-size:12px;">' +
        //   //  5  s $ f  
        //   "<div> <b class='limitword' title='" + f.name + "'>Dokumentenname: " + f.name + "</b> </div>" +
        //   //  6  s $ f  
        //   "<div> <b>Dateigröße: " + Size + "</b>  </div>" +
        //   //  7  s $ f  
        //   "<div> <b class='limitword'>Dateityp: " + typeofimage + "</b> </div>" +
        //   //  8  s $ f  
        //   "<div> <b>Datum des Dokuments: " + date + "</b> </div>" +
        //   // 4 f    
        //   "</div>" +



        //   '<div class="col-md-4 text-right d-flex flex-raw justify-content-end align-items-center ">' +
        //   // 11 s    remove (X) 
        //   '<div class=" p-0 ">' +
        //   // 12 s $ f  
        //   '<div class="removepreview btn btn-danger  links " id="removepreviewid' + newsize + '" style="cursor: pointer;" ><i class="fas fa-times"  aria-hidden="true"></i> <span class="removeandpreviewword" >Entfernen</span></div>' +
        //   // 11 f    
        //   '</div>' +

        //   // 9 s  preview (eye)
        //   "<div class=' p-0 ms-2'>" +
        //   // 10 s & f
        //   '<div class="previewdoc btn button-primary links  " data-doc_name="' + f.name + '" data-preview_source="' + (e.target as any).result + '" id="previewdoc' + newsize + '" style="cursor: pointer;"><i class="fa fa-eye" aria-hidden="true"></i> ' +
        //   '<span class="removeandpreviewword" >Vorschau</span>  </div>' +
        //   // 9 f
        //   "</div>" +
        //   '</div>' +

        //   // 2 f
        //   "</div>" +

        //   //  13 s progress bar (upload)
        //   "<div class='col-md-12 mt-2'>" +
        //   // 14 s 
        //   '<div class="progress form-group " id="progressnew' + newsize + i + '" style="background-color: grey;width: 100%;"> ' +
        //   // 15 s & f
        //   '<div class="percentageclass' + newsize + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + newsize + i + '" [style.width.%]=""> </div>' +
        //   // 14 f
        //   ' </div>' +
        //   // 13 f
        //   "</div>" +


        //   // 1 f
        //   "</div>"
        // ).insertAfter("#result");

        $(
          '<div class="pip col-md-4 p-0  " style="display: inline-block;" "id=\'pipremove' +
          newsize +
          "'>" +
          '<div class="col-md-11 p-0 d-flex m-1 flex-raw" style="border: 1px solid #cdcdcd;border-radius:9px;">' +

          '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center ">' +
          '<img class="imageThumb" style="width: 50px;height:30px;" src="' + ImageName + '" title="' + f.name + '"/>' +
          '</div>' +
          '<div class="col-md-8 p-0" style="font-size:11px; padding:1px">' +
          "<div> <b class='limitword' title='" + f.name + "'>Dokumentenname: " + f.name + "</b> </div>" +
          "<div> <b>Dateigröße: " + Size + "</b>  </div>" +
          "<div> <b class='limitword'>Dateityp: " + typeofimage + "</b> </div>" +
          "<div> <b>Datum des Dokuments: " + date + "</b> </div>" +
          "</div>" +


          '<div class="col-md-2 text-right d-flex flex-column p-0 align-items-center justify-content-center ">' +
          '<div class=" p-0 ">' +
          '<div class="removepreview btn bg-danger links " id="removepreviewid' + newsize + '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i></div>' +
          '</div>' +

          "<div class=' p-0 mt-1'>" +
          '<div class="previewdoc btn links  " data-doc_name="' + f.name + '" data-preview_source="' + (e.target as any).result + '" id="previewdoc' + newsize + '" style="cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px "><i class="fa fa-eye  text-white" aria-hidden="true"></i> ' +
          ' </div>' +
          "</div>" +
          '</div>' +

          "</div>" +

          "<div class='col-md-12 p-0 mt-2'>" +
          '<div class="progress form-group " id="progressnew' + newsize + i + '" style="background-color: grey;width: 100%;"> ' +
          '<div class="percentageclass' + newsize + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + newsize + i + '" [style.width.%]=""> </div>' +
          ' </div>' +
          "</div>" +

          "</div>"
        ).insertAfter("#result");





        $('.previewdoc').click(function (event) {
          previewData($(this).data('preview_source'), $(this).data('doc_name'));
          event.stopPropagation();
          event.stopImmediatePropagation();
        })


        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        $("#removepreviewid" + newsize).click(function () {
          removeData(newsize);
          // $("#pipremove" + i).remove();
          $(this).parent().parent().parent().parent(".pip").remove();
        });
      };
      fileReader.readAsDataURL(f);


      const formData = new FormData();
      formData.append("document", f);
      this.userService.uploaddocumentwithoutticketno(
        formData
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {

          case HttpEventType.Sent:
            console.log('Request has been made!');

            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:

            $('div.percentageclass' + newsize + i).width(Math.round((event.loaded / event.total) * 100) + "%");
            $('div.percentageclass' + newsize + i).html(Math.round((event.loaded / event.total) * 100) + "%");

            break;
          case HttpEventType.Response:

            setTimeout(() => {
              $('div.percentageclass' + newsize + i).width("0%");
              $('#progressnew' + newsize + i).css("display", "none");
            }, 500);

        }
      })

    }
    console.log(this.filearraynew);
  }

  open_modal(modal_id: any) {
    $('#' + modal_id).appendTo("body");
  }
  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }


}
