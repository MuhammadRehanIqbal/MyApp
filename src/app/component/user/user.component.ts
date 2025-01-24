import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../materialmodule';
import { users } from '../../_model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserComponent } from './updateuser/updateuser.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{

  userlist!: users[]; 
  displayedColumns: string[] = ["name","username","email","phone","statusname","role","action"];
  datasoure: any;
  _response:any;

  _users: users={
    username: '',
    name: '',
    email: '',
    phone: '',
    isactive: false,
    role: '',
    statusname: ''
  };
  
  @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;
  public get paginator(): MatPaginator {
    return this._paginator;
  }
  public set paginator(value: MatPaginator) {
    this._paginator = value;
  }
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private service: UserService, private toastr:ToastrService,
    private router: Router,private dialog:MatDialog){ 
  }
  ngOnInit(): void { 
    this.Loadusers();
  } 
  
  Loadusers(){
    this.service.Getalluser().subscribe(item=>{
      this.userlist = item;
      this.datasoure = new MatTableDataSource<users>(this.userlist);
      this.datasoure.paginator=this.paginator;
      this.datasoure.sort=this.sort;
    })
  }
  updaterole(username:string){ 
    this.Openpoup(username,'role');
  }
  updatestatus(username:string){ 
    this.Openpoup(username,'status');
  }

  Openpoup(username: string, type: string){
    this.dialog.open(UpdateuserComponent,{
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data:{
        username:username,
        type: type
      }
    }).afterClosed().subscribe(item=>{
      this.Loadusers();
    })
  }
}
