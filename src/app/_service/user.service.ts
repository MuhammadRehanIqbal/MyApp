import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { confirmregistation, loginresp, menue, menues, menupermission, resetpassword, roles, updatepassword, usercred, userregister, users } from '../_model/user.model';
import { Observable, single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  _registerresponse=signal<confirmregistation>({
    userid:0,
    username:'',
    otptext:''
  });
  _username=signal('');

  _menuelist=signal<menue[]>([]);

  Userregistration(_data: userregister){
    return this.http.post<any>(this.baseUrl+'User/userregistration',_data); 
  } 

  ConfirmRegistration(data: { userid: number; username: string; otptext: string }): Observable<any> {
    const url = `${this.baseUrl}User/confirmregistration?userid=${data.userid}&username=${data.username}&otptext=${data.otptext}`;
    return this.http.post<any>(url, {});
  }
  Procceedlogin(_data: usercred){
  return this.http.post<loginresp>(this.baseUrl + 'Authorize/GenerateToken' , _data);
  }
  Loadmenubyrole(role:string){
    return this.http.get<menue[]>(this.baseUrl + 'UserRole/getallmenuesbyrole?userrole='+role);
  }  
  Resetpassword(_data: {username: string; oldpassword:string; newpassword: string}): Observable<any> {
      const url = `${this.baseUrl}User/resetpassword?username=${_data.username}&oldpassword=${_data.oldpassword}&newpassword=${_data.newpassword}`;
      return this.http.post<any>(url, {}); 
  }
  Forgetpassword(username: string) {
    const url = `${this.baseUrl}User/forgetpassword?username=${username}`;
    return this.http.post<any>(url,{});
  }
  
  // Updatepassword(_data:updatepassword) {
  //   return this.http.post(this.baseUrl + 'UserRole/updatepassword?userrole', _data);
  // }

  Updatepassword(_data: {username: string; password:string; otptext: string}): Observable<any> {
    const url = `${this.baseUrl}User/updatepassword?username=${_data.username}&password=${_data.password}&otptext=${_data.otptext}`;
    return this.http.post<any>(url, {}); 
  }

  Getmenupermission(userrole:string, menuecode:string){
    return this.http.get<menupermission>(this.baseUrl + 'UserRole/getmenuespermissionbyrole?userrole='+userrole+'&menuecode='+menuecode);
  }  
  Getalluser(){
    return this.http.get<users[]>(this.baseUrl + 'User/getall');
  }  
  
  Updatestatus(_data:  {username: string; userstatus:boolean;}): Observable<any> {
    const url = `${this.baseUrl}User/updatestatus?username=${_data.username}&userstatus=${_data.userstatus}`;
    return this.http.post<any>(url, {});  
  }  
  
  Updaterole(_data:  {username: string; userrole:string;}): Observable<any> {
    const url = `${this.baseUrl}User/updaterole?username=${_data.username}&userrole=${_data.userrole}`;
    return this.http.post<any>(url, {}); 
    }  
  Getuserbycode(code: string){
    return this.http.get<users>(this.baseUrl + 'User/GetByCode?code='+code);
  }
  Getallroles(){
    return this.http.get<roles[]>(this.baseUrl + 'UserRole/getallroles');
  }
  
  Getallmenues(){
    return this.http.get<menues[]>(this.baseUrl + 'UserRole/getallmenues');
  }
  Assignrolepermission(_data: menupermission[]){
    return this.http.post<any>(this.baseUrl+'UserRole/assignrolepermission',_data); 
  }  
}
