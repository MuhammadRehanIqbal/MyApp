import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../materialmodule';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { customer } from '../../_model/customer.model';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatTableDataSource } from '@angular/material/table';
import { menupermission } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { StringLiteral } from 'typescript';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  customerlist!: customer[];
  displayedColumns: string[] = ["code","name","email","phone","creditlimit","status","action"];
  datasoure: any;
  _response:any;

  _permision: menupermission={ 
    code: '',
    name: '',
    haveview: false,
    haveadd: false,
    haveedit: false,
    havedelete: false
  };
  
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private service: CustomerService,private userservice: UserService, private toastr:ToastrService,
    private router: Router){
    this.Setaccess();
  }
  ngOnInit(): void { 
    this.Loadcustomer();
  }
  Setaccess(){
    let role = localStorage.getItem('userrole') as string;
    this.userservice.Getmenupermission(role,'customer').subscribe(item=>{
    this._permision = item;
    })
  }
  Loadcustomer(){
    this.service.GetAll().subscribe(item=>{
      this.customerlist = item;
      this.datasoure = new MatTableDataSource<customer>(this.customerlist);
      this.datasoure.paginator=this.paginator;
      this.datasoure.sort=this.sort;
    })
  }
  Editcustomer(code:string){
    if(this._permision.haveedit){
      this.router.navigateByUrl('/customer/edit/'+code)
    }else{
      this.toastr.warning('user not having edit access','warning');
    }
  }
  Deletecustomer(code:string){
    if(this._permision.havedelete){
      if(confirm('Are you sure!')){
        this.service.Deletecustomer(code).subscribe(item=>{
          this._response =item;
          if(this._response.result=='pass'){
            this.toastr.success('Deleted successlly','Success');
            this.Loadcustomer();
          }else{
            this.toastr.error('due to : ' + this._response.message,'failed')
          }
        })
      }
    }else{
      this.toastr.warning('user not having delete access','warning');
    }

  }
}
