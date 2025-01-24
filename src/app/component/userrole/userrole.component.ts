import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../materialmodule';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { menues, menupermission, roles } from '../../_model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userrole',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './userrole.component.html',
  styleUrl: './userrole.component.css'
})
export class UserroleComponent implements OnInit {
  rolelist!: roles[];
  menuelist!: menues[];
  accessarray!: FormArray<any>;
  roleform: any;
 useraccess!: menupermission;
 _response:any;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: UserService
  ) {
    // Initialize the roleform here
    this.roleform = this.builder.group({
      userrole: this.builder.control('', Validators.required),
      access: this.builder.array([])
    });
  }

  ngOnInit(): void {
    this.Loadallroles();
    this.Loadallmenues('');
  }

  Generatemenuerow(input: menues,_access: menupermission,role:string) {
    return this.builder.group({
      menucode: this.builder.control(input.code),
      haveview: this.builder.control(_access.haveview),
      haveadd: this.builder.control(_access.haveadd),
      haveedit: this.builder.control(_access.haveedit),
      havedelete: this.builder.control(_access.havedelete),
      userrole: this.builder.control(role)
    });
  }

  Addnewrow(input: menues,_access: menupermission,role: string) {
    this.accessarray.push(this.Generatemenuerow(input,_access,role));
  }

  get getrows() {
    return this.roleform.get('access') as FormArray;
  }

  Loadallroles() {
    this.service.Getallroles().subscribe(item => {
      this.rolelist = item;
    });
  }

  Loadallmenues(userrole: string) {
    // Ensure accessarray is properly set up
    this.accessarray = this.roleform.get('access') as FormArray;
    this.accessarray.clear();
debugger
    this.service.Getallmenues().subscribe(item => {
      this.menuelist = item;
      if (this.menuelist.length > 0) {
        this.menuelist.map((o: menues) => {
          
        if(userrole!=''){
          this.service.Getmenupermission(userrole,o.code).subscribe(item=>{
            this.useraccess=item;
            this.Addnewrow(o,this.useraccess,userrole);
          })
        }else{
          
          this.Addnewrow(o,{
            code: '',
            name: '',
            haveview: false,
            haveadd: false,
            haveedit: false,
            havedelete: false
          },'');
        }
        });
      }
    });
  }
  rolechange(event:any){
    let selectedrole =event.value;
    this.Loadallmenues(selectedrole);
  }
  Saveroles() {
    if(this.roleform.valid){
      let formarray= this.roleform.value.access as menupermission[]
      this.service.Assignrolepermission(formarray).subscribe(item=>{
        this._response = item;
        if(this._response.result == 'pass'){  
          this.toastr.success('Permission assigned successfully','Saved'); 
        }else{
          this.toastr.error('Failed due to : ' + this._response.message + 'Menue access assignment');
        }
      })
      // formarray.map((o:menupermission)=>{
      //   o.userrole=this.roleform.value.userrole as string;
      // })
    }
  }
}
