import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../materialmodule';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { updatepassword } from '../../_model/user.model';

@Component({
  selector: 'app-updatepassword',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent implements OnInit {
  currentuser='';
  _updatepassform;
  _response: any;

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router){
    this._updatepassform = this.builder.group({ 
      otptext: this.builder.control('',Validators.required),
      password: this.builder.control('',Validators.required)
    })
  }

  ngOnInit(): void { 
    this.currentuser = this.service._username();
  }
  

  proceedchange(){
    if(this._updatepassform.valid){
      let _obj:updatepassword={
        username: this.currentuser,
        password: this._updatepassform.value.password as string,
        otptext: this._updatepassform.value.otptext as string
      }
      
      this.service.Updatepassword(_obj).subscribe(item=>{
        this._response = item;  
        
        if(this._response.result == 'pass'){  
          this.toastr.success('Please login with new password','Password changed');
          this.router.navigateByUrl('/login');
        }else{
          this.toastr.error('Failed due to : ' + this._response.message + 'Resetpassword failed');
        }
      });
    };
  }
}
