import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers:[MessageService]
})
export class AuthenticationComponent implements OnInit{

  loginForm: FormGroup = Object.create(null);
  errorMessage: string = "";
  charge: Observable<any> = new Observable<any>();
  user: any;
  role:any;
  isLoading = false;
  constructor(private api:ApiUrlService,private http: ResponseService, private formBuilder: FormBuilder,private messageService: MessageService,
     private router: Router,private httpService:ResponseService,private tokenService: TokenService,public translate: TranslateService) {
    this.user = JSON.parse(this.httpService.getUser());
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');



  }

  ngOnInit(): void {
    if (this.user?.id) {
      this.router.navigate(['/']);
       return;
     }

    this.loginForm =  this.formBuilder.group({

       username :new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(4)])
    });


    console.log("token",this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token'))));

    this.user = this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token')));

     console.log("role",this.role= this.user.role[0]);

  }


  loginUser(){
    let loginRequest= {
      username :this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.isLoading = true;
    return this.http.postElement(this.api.API_URI + url.login, loginRequest).subscribe(data => {

      console.log(data);

      this.isLoading =true;

       this.http.sessionset('token', JSON.stringify(data.token));
       this.http.sessionset('username',this.loginForm.get('username')?.value);

      this.router.navigate(['/gestion/etablissement']);
    }, error =>{

      this.isLoading = false;

       this.messageService.add({
            severity:'error',
            summary: 'Erreur de connexion',
            detail: 'Le nom ou le mot de passe saisie est incorrect !',
            life: 3000
          });
    }
    )



  }

  changeLang(lang:any){

    const selectLang = lang.target.value;
    localStorage.setItem('lang',selectLang);
    this.translate.use(selectLang);
    console.log("event",selectLang);

  }

  get username(){
     return this.loginForm.controls['username'];
  }
  get password(){
    return this.loginForm.controls['password'];
 }


}
