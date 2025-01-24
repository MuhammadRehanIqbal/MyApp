import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../materialmodule';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../_service/customer.service';
import { customer } from '../../../_model/customer.model';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,RouterLink],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit{
  customerform;
  _response:any;
  title='Add Customer';
  editcode='';
  isedit=false;
  editdata!:customer;

  constructor(private builder:FormBuilder, private toastr: ToastrService, private router: Router,
    private service: CustomerService, private act: ActivatedRoute){
          
      this.customerform = this.builder.group({
        code: this.builder.control('',Validators.required),
        name: this.builder.control('',Validators.required),
        email: this.builder.control('',Validators.required),
        phone: this.builder.control('',Validators.required),
        creditlimit: this.builder.control(0,Validators.required), 
        status: this.builder.control(true)
      })
    }

  ngOnInit(): void { 
    this.editcode=this.act.snapshot.paramMap.get('code') as string;
    if(this.editcode!=null&&this.editcode!=''){
      this.isedit=true;
      this.title='Edit Customer';
      this.customerform.controls['code'].disable();

      this.service.Getbycode(this.editcode).subscribe(item=>{
        this.editdata = item;
        this.customerform.setValue({
          code:this.editdata.code,
          name:this.editdata.name,
          email:this.editdata.email,
          phone:this.editdata.phone,
          creditlimit:this.editdata.creditlimit,
          status:this.editdata.isActive 
        })
      })
    }
  }
 
  Savecustomer(){
    if(this.customerform.valid){
      let _obj: customer={
        code: this.customerform.value.code as string,
        name: this.customerform.value.name as string,
        email: this.customerform.value.email as string,
        phone: this.customerform.value.phone as string,
        creditlimit: this.customerform.value.creditlimit as number,
        isActive: this.customerform.value.status as boolean,
        taxcode:0,
        statusName: ''
      };

      if(!this.isedit){
        
      this.service.Createcustomer(_obj).subscribe(item=>{
        this._response =item;
        if(this._response.result=='pass'){
          this.toastr.success('Created successlly','Success');
          this.router.navigateByUrl('/customer');
        }else{
          this.toastr.error('due to : ' + this._response.message,'failed')
        }
      })
      }else{
        _obj.code = this.editcode;
        this.service.Updatecustomer(_obj).subscribe(item=>{
          this._response =item;
          if(this._response.result=='pass'){
            this.toastr.success('Updated successlly','Success');
            this.router.navigateByUrl('/customer');
          }else{
            this.toastr.error('due to : ' + this._response.message,'failed')
          }
        })
      }
    }
  }

}
