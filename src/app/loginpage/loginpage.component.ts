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
  async userLogin() {
    let loggedUserStatus
    if(this.loggedUserData['username'] !== null && this.loggedUserData['password'] !== null && this.loggedUserData['username'] !== "" && this.loggedUserData['password'] !== ""){
      await this.dataProvider.getRegisterData().then((res: any) => {
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
    } else {
      if ((this.loggedUserData['username'] === null || this.loggedUserData['username'] === "") && this.loggedUserData['password'] !== null) {
        alert("Kindly Enter the User name")
      } else if (this.loggedUserData['username'] !== null && (this.loggedUserData['password'] === null || this.loggedUserData['password'] === "")) {
        alert("Kindly Enter the password")
      } else {
        alert("Kindly Enter the User name and password")
      }
    }
  }
  isPageFromProduct(){
    this.isUserLoggedIn = false
    this.appComponent.showToolBar(this.isUserLoggedIn)
  }
  navigateToRegisterPage(){
    this.router.navigateByUrl("registerpage")
  }
}
