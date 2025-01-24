import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../materialmodule';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [FormsModule,MaterialModule,RouterLink],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {

  username=''; 
_reponse:any;

  constructor(private toastr: ToastrService, private router:Router,private service: UserService){}
  ngOnInit(): void { 
  }


  Proceed(){
    
    this.service.Forgetpassword(this.username).subscribe(item=>{
      this._reponse = item;

      if(this._reponse.result == 'pass'){

        this.toastr.success('OTP sent to the registered email', 'Forget Password'); 
        this.service._username.set(this.username);
        this.router.navigateByUrl('/updatepassword');
      }else{
        this.toastr.error('Failed Due to : ' + this._reponse.message, 'Registration Failed');
      }
    })
  }
}
