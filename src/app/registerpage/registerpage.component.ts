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
  constructor(private router: Router, public appComponent: AppComponent, public dataProvider : DataProviderService){
    this.loggedUserData = {
      username : null,
      email: null,
      password : null
    }
  }
  userLogin(){
    console.log(this.loggedUserData)
    this.dataProvider.registerData(this.loggedUserData)
    this.router.navigateByUrl("/Loginpage")
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
