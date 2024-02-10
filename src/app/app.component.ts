import { Component } from '@angular/core';
import { EntrypageComponent } from './entrypage/entrypage.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testangularproject';
  isLoggedUser: boolean = false
  public observer = new Subject()
  constructor(public dialog: MatDialog, private router: Router) {
    this.isLoggedUser = false

  }

  addButtonOnClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      parentPage: this,
      actionType: "add"
    };
    const dialogRef = this.dialog.open(EntrypageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.observer.next({})
    });
  }
  Logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl("/Loginpage")
  }
  showToolBar(flag: any) {
    if (flag) {
      this.isLoggedUser = true
    } else {
      this.isLoggedUser = false
    }

  }
}
