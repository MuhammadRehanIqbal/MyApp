import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { resetpassword } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { MaterialModule } from '../../materialmodule';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{

  _resetform;
  _response: any;

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router){
    this._resetform = this.builder.group({
      //username: this.builder.control('',Validators.required),
      oldpassword: this.builder.control('',Validators.required),
      newpassword: this.builder.control('',Validators.required)
    })
  }

  ngOnInit(): void { 
  }
  

  proceedchange(){
    if(this._resetform.valid){
      let _obj:resetpassword={
        username: localStorage.getItem('username') as string,
        oldpassword: this._resetform.value.oldpassword as string,
        newpassword: this._resetform.value.newpassword as string
      }
      
      this.service.Resetpassword(_obj).subscribe(item=>{
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
