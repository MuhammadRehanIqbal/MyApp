import { Component, DoCheck, OnInit, effect } from '@angular/core';
import { MaterialModule } from '../../materialmodule';
import { UserService } from '../../_service/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { menue } from '../../_model/user.model';

@Component({
  selector: 'app-appmenue',
  standalone: true,
  imports: [MaterialModule,RouterOutlet,RouterLink],
  templateUrl: './appmenue.component.html',
  styleUrl: './appmenue.component.css'
})
export class AppmenueComponent implements OnInit,DoCheck{

  constructor(private service: UserService,private router: Router){
    effect(()=>{
      this.menulist = this.service._menuelist();
    })
  }

    menulist!: menue[];
    loginuser ='';
    showmenu = false;

  ngOnInit(): void {
    let userrole = localStorage.getItem('userrole') as string;

    this.service.Loadmenubyrole(userrole).subscribe(item=>{
      this.menulist = item;
    })
  }
  ngDoCheck(): void {
    this.loginuser = localStorage.getItem('username') as string;
    this.Setaccess();
  }
  Setaccess(){
    let userrole = localStorage.getItem('userrole');
    let currentUrl = this.router.url;
    if(currentUrl == '/register' || currentUrl == '/login' || currentUrl == '/resetpassword' || currentUrl == '/forgetpassword' || currentUrl =='/updatepassword'){
      this.showmenu = false;
    }else{
      this.showmenu = true;
    }
  }
}
