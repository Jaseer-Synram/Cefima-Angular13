import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConsultingRoutingModule } from "./consulting-routing.module";
import { ConsultingComponent } from "./consulting.component";
import { SharedModule } from "../shared/shared.module";
import { SignaturePadModule } from "angular2-signaturepad";
import { SelectConsultingComponent } from "./select-consulting/select-consulting.component";
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
// import { PdfViewerModule } from "ng2-pdf-viewer";

@NgModule({
  declarations: [ConsultingComponent, SelectConsultingComponent],
  imports: [CommonModule, ConsultingRoutingModule, SharedModule],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class ConsultingModule {}
