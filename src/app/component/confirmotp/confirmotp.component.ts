import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../../materialmodule';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { confirmregistation } from '../../_model/user.model';
@Component({
  selector: 'app-confirmotp',
  standalone: true,
  imports: [FormsModule,MaterialModule,RouterLink],
  templateUrl: './confirmotp.component.html',
  styleUrl: './confirmotp.component.css'
})
export class ConfirmotpComponent implements OnInit {
  otptext='';
  registerresponse!: confirmregistation;
_reponse:any;

  constructor(private toastr: ToastrService, private router:Router,private service: UserService){}
  ngOnInit(): void {
    this.registerresponse = this.service._registerresponse();

  }


  confirmOtp(){
    this.registerresponse.otptext = this.otptext;
    this.service.ConfirmRegistration(this.registerresponse).subscribe(item=>{
      this._reponse = item;

      if(this._reponse.result == 'pass'){
        this.toastr.success('Registeration completed successfully', 'Success');
        this.service._registerresponse.set({
          userid:0,
          username:'',
          otptext:''
        })
        this.router.navigateByUrl('/login');
      }else{
        this.toastr.error('Failed Due to : ' + this._reponse.message, 'Registration Failed');
      }
    })
  }
}
