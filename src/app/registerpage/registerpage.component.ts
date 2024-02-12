import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent {
  public loggedUserData:any;
  isUserLoggedIn:boolean = false;
  public loggedUserDataSet:any;
  constructor(private router: Router, public appComponent: AppComponent, public dataProvider : DataProviderService){
    this.dataProvider.getRegisterData().then((res:any)=>{
      this.loggedUserDataSet = res
    })
    this.loggedUserData = {
      username : "",
      email: "",
      password : ""
    }
  }
  async userLogin() {
    let loggedUserStore
    let isAlreadyLoggedUser: any;
    if(this.loggedUserData['email'] !== "" && this.loggedUserData['username'] !== "" && this.loggedUserData['password'] !== ""){
      isAlreadyLoggedUser = this.loggedUserDataSet.filter(user => {
        return user.username === this.loggedUserData['username'] && user.email === this.loggedUserData['email']
      })
      if (isAlreadyLoggedUser.length === 0) {
        await this.dataProvider.registerData(this.loggedUserData).then((res: any) => {
          loggedUserStore = res
        })
        localStorage.setItem('user', loggedUserStore)
        this.router.navigateByUrl("productlist")
      } else {
        alert("User name Already exist. Kindly login")
      }
    } else{
      if (this.loggedUserData['username'] === "" && this.loggedUserData['password'] !== "" && this.loggedUserData['email'] !== "") {
        alert("Kindly Enter the User name")
      } else if (this.loggedUserData['username'] !== "" && this.loggedUserData['password'] === "" && this.loggedUserData['email'] !== "") {
        alert("Kindly Enter the password")
      } else if (this.loggedUserData['username'] !== "" && this.loggedUserData['password'] !== "" && this.loggedUserData['email'] === "") {
        alert("Kindly Enter the email")
      } else if (this.loggedUserData['username'] !== "" && this.loggedUserData['password'] === "" && this.loggedUserData['email'] === "") {
        alert("Kindly Enter the email and password")
      } else if (this.loggedUserData['username'] === "" && this.loggedUserData['password'] === "" && this.loggedUserData['email'] !== "") {
        alert("Kindly Enter the user name and password")
      } else if (this.loggedUserData['username'] === "" && this.loggedUserData['password'] !== "" && this.loggedUserData['email'] === "") {
        alert("Kindly Enter the user name and email")
      } else {
        alert("Kindly Enter the User name, email and password")
      }

    }    
  }
  isPageFromProduct(){
    this.isUserLoggedIn = false
    this.appComponent.showToolBar(this.isUserLoggedIn)
  }
  backToLoginPage(){
    console.log(this.loggedUserData)
    this.router.navigateByUrl("/Loginpage")
  }
}
