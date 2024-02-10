import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public responseData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }
  async getData() {
    return new Promise((resolve, reject) => {
      this.http.get('https://crudcrud.com/api/1078d97de99745abbf2a305b5d61ee40/create')
        .subscribe((data: any) => {
          resolve(data)
        }, (error: any) => {
          reject('Error fetching data')
        });
    })
  }


  postData(postData: any) {
    return new Promise((resolve, reject) => {
      this.http.post('https://crudcrud.com/api/1078d97de99745abbf2a305b5d61ee40/create', postData)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject('Error posting data');
        });
    })
  }
  putData(postData: any, id) {
    let body = JSON.parse(JSON.stringify(postData))
    delete body["_id"]
    return new Promise((resolve, reject) => {
      this.http.put('https://crudcrud.com/api/1078d97de99745abbf2a305b5d61ee40/create/' + id, body)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject('Error posting data');
        });
    })
  }
  deleteData(id) {
    return this.http.delete('https://crudcrud.com/api/1078d97de99745abbf2a305b5d61ee40/create/' + id)

  }
  registerData(registerData: any) {
    return new Promise((resolve, reject) => {
      this.http.post('https://crudcrud.com/api/1078d97de99745abbf2a305b5d61ee40/register', registerData)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject('Error posting data');
        });
    })
  }
  async getRegisterData() {
    return new Promise((resolve, reject) => {
      this.http.get('https://crudcrud.com/api/1078d97de99745abbf2a305b5d61ee40/register')
        .subscribe((data: any) => {
          resolve(data)
        }, (error: any) => {
          reject('Error fetching data')
        });
    })
  }
}