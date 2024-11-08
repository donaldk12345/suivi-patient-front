import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthenticationService } from "src/app/services/authentication.service";
import { AuthService } from "src/app/services/guard/auth.service";
import { LoaderService } from "src/app/services/loader.service";
import { ResponseService } from "src/app/services/response.service";
import { TokenService } from "src/app/services/token.service";





@Component({
  selector: 'gestion',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{

  user: any;
  currentUser: any;
  role: any;
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  verify:boolean | undefined;
  manager_admin:boolean | undefined;
  constructor(private httpService: ResponseService, private router: Router,private tokenService:TokenService,public loaderService:LoaderService,public auth:AuthenticationService) {

    this.verify = this.auth.isLoggedIn();
    this.manager_admin = this.auth.isManAdm();
  }
    ngOnInit(): void{
      

      this.user = this.tokenService.DecodeToken(JSON.stringify(this.httpService.sessionget('token')));

     // console.log("role",this.role= this.user.role[0]);

  }
}
