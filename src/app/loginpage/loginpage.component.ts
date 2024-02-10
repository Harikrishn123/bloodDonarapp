import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  public loggedUserData:any;
  isUserLoggedIn:boolean = false
  constructor(private router: Router, public appComponent: AppComponent, public dataProvider : DataProviderService){
    this.isPageFromProduct()
    this.loggedUserData = {
      username : null,
      password : null
    }
  }
  userLogin() {
    let loggedUserStatus
    console.log(this.loggedUserData)
    this.dataProvider.getRegisterData().then((res: any) => {
      console.log(res);
      loggedUserStatus = res.filter(e => {
        return e.username === this.loggedUserData['username'] && e.password === this.loggedUserData['password']

      })
      localStorage.setItem('user', loggedUserStatus)
      if (loggedUserStatus.length > 0 && loggedUserStatus[0]['_id'].length > 0) {
        this.router.navigateByUrl("productlist")
      } else{
        alert("Pls register your user")
      }
    })
  }
  isPageFromProduct(){
    this.isUserLoggedIn = false
    this.appComponent.showToolBar(this.isUserLoggedIn)
  }
  navigateToRegisterPage(){
    this.router.navigateByUrl("registerpage")
  }
}
