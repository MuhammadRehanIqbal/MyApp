import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../../materialmodule';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { roles, udpateuser, users } from '../../../_model/user.model';
import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class UpdateuserComponent implements OnInit{
dialogdata:any;
userform:any;
userdata!: users;
rolelist!: roles[];
type ='';
_response:any;
  constructor(private builder: FormBuilder, private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: UserService,
    private ref: MatDialogRef<UpdateuserComponent>){ 
  }
  ngOnInit(): void { 
    this.Loadroles();
    this.dialogdata = this.data;
    this.type = this.dialogdata.type;
     if(this.dialogdata.username !==''){
      this.service.Getuserbycode(this.dialogdata.username).subscribe(item =>{
        this.userdata = item;
        this.userform.setValue({username:this.userdata.username,role:this.userdata.role,status:this.userdata.isactive})
      })

     }
    this.userform = this.builder.group({
    username: this.builder.control({value:'',disabled:true}),
    role: this.builder.control('',Validators.required),
    status: this.builder.control(true)
    })
  }
  Loadroles(){
    this.service.Getallroles().subscribe(item=>{
      this.rolelist =item;
    })
  }
  proceedchange(){
    if(this.userform.valid){
      let _obj: udpateuser={
        username: this.dialogdata.username,
        userrole: this.userform.value.role as string,
        userstatus: this.userform.value.status as boolean
      }
      if(this.type==='role'){
        this.service.Updaterole(_obj).subscribe(item=>{
          this._response = item;  
        
          if(this._response.result == 'pass'){  
            this.toastr.success('Updated successfully','Role updated');
             this.Closepoup();
          }else{
            this.toastr.error('Failed due to : ' + this._response.message + 'Role Updated');
          }
        })
      }else{
        
        this.service.Updatestatus(_obj).subscribe(item=>{
          this._response = item;  
        
          if(this._response.result == 'pass'){  
            this.toastr.success('Updated successfully','Status updated');
             this.Closepoup();
          }else{
            this.toastr.error('Failed due to : ' + this._response.message + 'Status Updated');
          }
        })
      }
    }
  }

  Closepoup(){
    this.ref.close();
  }
}
