import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  GetAll(){
    return this.http.get<customer[]>(this.baseUrl + 'Cutomer/GetAll');
  }
  Getbycode(code: string){
    return this.http.get<customer>(this.baseUrl + 'Cutomer/GetByCode?code='+code);
  }
  Createcustomer(_data: customer){
    return this.http.post<any>(this.baseUrl +'Cutomer/Create',_data);
  }
   
  Updatecustomer(_data: customer){
    return this.http.put(this.baseUrl +'Cutomer/Update?code='+_data.code,_data);
  }
  
  Deletecustomer(code: string){
    return this.http.delete(this.baseUrl +'Cutomer/Remove?code='+code);
  }
  
}
