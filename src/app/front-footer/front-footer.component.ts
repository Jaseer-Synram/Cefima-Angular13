import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-footer',
  templateUrl: './front-footer.component.html',
  styleUrls: ['./front-footer.component.css']
})
export class FrontFooterComponent implements OnInit {

  year: any = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
