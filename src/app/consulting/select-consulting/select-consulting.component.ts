// import { Component, OnInit } from '@angular/core';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Console } from 'console';
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-select-consulting',
  templateUrl: './select-consulting.component.html',
  styleUrls: ['./select-consulting.component.css']
})
export class SelectConsultingComponent implements OnInit {

  // message: string = "Are you sure?"
  // confirmButtonText = "Yes"
  // cancelButtonText = "Cancel"
  // @Input() contractType: any;
  contractType: any = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<SelectConsultingComponent>) {
    if (data) {
      // this.message = data.message || this.message;
      // if (data.buttonText) {
      //   this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      //   this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      // }
    }
  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    // this.dialogRef.close(true);
    this.dialogRef.close({ event: false });
  }
  setContractType(type: any) {
    console.log(type)
    this.dialogRef.close({ event: true, data: type });
  }

}
