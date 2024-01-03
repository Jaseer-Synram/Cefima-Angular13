import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokensession = localStorage.getItem("token");
  localdata = JSON.parse(localStorage.getItem("currentUser"));
  currentActiveRole = localStorage.getItem("currentActiveRole");
  year: any = new Date().getFullYear();

  // id = this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
  //   .id;

  constructor(public router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    
  }

  gotosessiondashboard() {
    if (this.tokensession != null) {
      if (this.currentActiveRole == "b2b") {
        // this.router.navigate(["/b2b-home"]);
      } else {
        // this.router.navigate(["/kunde-home"], { queryParams: { id: this.id } });
      }
    } else {
      // this.router.navigate(["/"]);
    }
  }

}
