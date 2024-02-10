import { Component, Renderer2, TemplateRef, TestabilityRegistry, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataProviderService } from '../data-provider.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EntrypageComponent } from '../entrypage/entrypage.component';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  public responseData: any;
  public count = 0
  dtOptions: DataTables.Settings = {};
  isUserLoggedIn: boolean = false;
  constructor(private http: HttpClient, private dataProviderService: DataProviderService, public dialog: MatDialog, private renderer: Renderer2, private router: Router, public appComponent: AppComponent) {
    this.isPageFromProduct()
    this.appComponent.observer.subscribe((res: any) => {
      this.initialFetch()
    })
    // this.entryPage
    this.dataProviderService.getData().then((res: any) => {
      res.forEach((ele: any, index: number) => {
        ele['sno'] = index + 1
      });
      console.log(res);
      this.responseData = res
      this.data = res

    })
    // this.dtOptions = {
    //   ajax:  (dataTablesParameters: any, callback) => {
    //     this.dataProviderService.getData().then((resp:any) => {
    //         callback({
    //           recordsTotal: 10,
    //           recordsFiltered: true,
    //           data: resp             // <-- see here
    //         });
    //       })},
    //   columns: [{
    //     title: 'Sl.no',
    //     data: 'id'
    //   }, {
    //     title: 'Blood type',
    //     data: "resp"
    //   }, {
    //     title: 'Full name',
    //     data: 'lastName'
    //   }, 
    //   {
    //     title: 'Birth date',
    //     data: 'lastName'
    //   }, 
    //   {
    //     title: 'Gender',
    //     data: 'lastName'
    //   }, 
    //   {
    //     title: 'Address',
    //     data: 'lastName'
    //   },
    //   {
    //     title: 'Have you donate previuosly',
    //     data: 'lastName'
    //   }, 
    //   {
    //     title: 'Are you a patient',
    //     data: 'lastName'
    //   }, 
    //   {
    //     title: 'Action',
    //     render: function (data: any, type: any, full: any) {
    //       // this.editButtonOnclick(data)
    //       return 'View';
    //     }
    //   }]
    // };

  }

  // ---------------------------------------


  isPageFromProduct() {
    this.isUserLoggedIn = true
    this.appComponent.showToolBar(this.isUserLoggedIn)
  }
  public configuration!: Config;
  public columns!: Columns[];
  public data = [];
  editRow!: number;
  @ViewChild('actionEdit', { static: true }) actionEdit!: TemplateRef<any>;
  @ViewChild('actionDelete', { static: true }) actionDelete!: TemplateRef<any>;
  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    // ... etc.
    this.columns = [
      { key: 'sno', title: 'Sl.no' },
      { key: 'bloodtype', title: 'Blood type' },
      { key: 'fullname', title: 'Full name' },
      { key: 'birthdate', title: 'Birth date' },
      { key: 'gender', title: 'Gender' },
      { key: 'address', title: 'Address' },
      { key: 'haveyoudonatepreviuosly', title: 'Have you donate previuosly' },
      { key: 'Areyouapatient', title: 'Are you a patient' },
      { key: 'edit', title: 'Edit', cellTemplate: this.actionEdit },
      { key: 'delete', title: 'Delete', cellTemplate: this.actionDelete }
    ];
  }
  edit(rowIndex: number): void {
    this.editRow = rowIndex;
    this.editButtonOnclick(this.data[rowIndex])

  }
  deleteRow(rowIndex: number): void {
    console.log(this.data[rowIndex]);
    let id = this.data[rowIndex]['_id']
    this.dataProviderService.deleteData(id).subscribe((res: any) => {
      this.initialFetch()
    })

  }
  editButtonOnclick(response: any) {
    console.log(response);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      parentPage: this,
      data: response,
      actionType: "Edit"
    };
    this.dialog.closeAll()
    let dialogRef = this.dialog.open(EntrypageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      this.initialFetch()
    });
  }
  // update(): void {
  //   this.data = [
  //     ...this.data.map((obj, index) => {
  //       if (index === this.editRow) {
  //         return {
  //           phone: this.phone.nativeElement.value,
  //           age: this.age.nativeElement.value,
  //           company: this.company.nativeElement.value,
  //           name: this.name.nativeElement.value,
  //           isActive: this.name.nativeElement.value,
  //         };
  //       }
  //       return obj;
  //     }),
  //   ];
  //   this.editRow = -1;
  // }
  initialFetch() {
    this.dataProviderService.getData().then((res: any) => {
      res.forEach((ele: any, index: number) => {
        ele['sno'] = index + 1
        this.data = res
      });
      console.log(res);
    })
  }

}
