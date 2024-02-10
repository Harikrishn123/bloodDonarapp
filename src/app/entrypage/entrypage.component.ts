import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormsModule,
  FormGroup
} from '@angular/forms';
import { DataProviderService } from '../data-provider.service';
import { Router } from '@angular/router';
import { ProductlistComponent } from '../productlist/productlist.component';

@Component({
  selector: 'app-entrypage',
  templateUrl: './entrypage.component.html',
  styleUrls: ['./entrypage.component.css']
})
export class EntrypageComponent {
  public dataObject: any;
  public formGroup!: FormGroup;
  public gender: any = [{
    "title": "Male",
    "value": "Male"
  }, {
    "title": "Female",
    "value": "Male"
  }]
  public haveyoudonatepreviuosly: any = [{
    "title": "YES",
    "value": "YES"
  }, {
    "title": "NO",
    "value": "YES"
  }]
  public areyouapatient: any = [{
    "title": "YES",
    "value": "YES"
  }, {
    "title": "NO",
    "value": "YES"
  }]
  public bloodtype: string = ""
  reactiveForm: FormGroup
  actionType: String
  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<EntrypageComponent>, public dialog: MatDialog, public dataProviderService: DataProviderService, private router: Router, private fb: FormBuilder) {
    this.dataObject = {
      "bloodtype": null,
      "fullname": null,
      "birthdate": null,
      "gender": null,
      "address": null,
      "haveyoudonatepreviuosly": null,
      "Areyouapatient": null
    }
    if (data !== undefined) {
      this.initialProcessForPopupNavigation(data)
    }
  }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      bloodtype: ['', [Validators.required]],
      fullname: [null],
      birthdate: [null],
      address: [null],
      gender: [null],
      haveyoudonatepreviuosly: [null],
      Areyouapatient: [null]
    });


    // new FormGroup({
    //   bloodtype: new FormControl(null),
    //   fullname: new FormControl(null),
    //   // birthdate: new FormControl(null),
    //   gender: new FormControl(null),
    //   // address: new FormControl(null),
    //   haveyoudonatepreviuosly: new FormControl(null),
    //   Areyouapatient: new FormControl(null)
    // })

  }
  initialProcessForPopupNavigation(data: any) {
    if (data["actionType"] === "Edit") {
      this.actionType = "Edit"
      this.dataObject = data["data"]
    }
  }
  saveButtonOnClick() {
    console.log(this.dataObject);
  }
  onSubmit() {
    console.log(this.reactiveForm);
    if (this.actionType === "Edit") {
      this.dataProviderService.putData(this.dataObject, this.dataObject["_id"]).then((res: any) => {
        console.log(res);
        this.dialogRef.close();
      })
    } else {
      this.dataProviderService.postData(this.dataObject).then((res: any) => {
        console.log(res);
        this.dialogRef.close();
      })
    }
  }

}
