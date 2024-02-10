import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }
  isAuthenticated(): boolean {
    const storedValue = localStorage.getItem('user');
    if(storedValue){
      return true;
    }
    // Check if the user is logged in (implement your logic)
    return false; // For example, return true if user is logged in; otherwise, return false
  }
}
