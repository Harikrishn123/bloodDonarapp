import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { EntrypageComponent } from './entrypage/entrypage.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataTablesModule } from 'angular-datatables';
import { TableModule } from 'ngx-easy-table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterpageComponent } from './registerpage/registerpage.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductlistComponent,
    LoginpageComponent,
    EntrypageComponent,
    RegisterpageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    DataTablesModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
