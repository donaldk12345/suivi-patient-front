
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { ResponseService } from '../services/response.service';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TokenService } from '../services/token.service';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = Object.create(null);
  errorMessage: string = "";
  charge: Observable<any> = new Observable<any>();
  user: any;
  role:any;
  isLoading = false;
  constructor(private http: ResponseService, private formBuilder: FormBuilder,private messageService: MessageService,
     private router: Router,private httpService:ResponseService,private tokenService: TokenService) {
    this.user = JSON.parse(this.httpService.getUser());
  }

  ngOnInit(): void {
    if (this.user?.id) {
      this.router.navigate(['/']);
       return;
     }

    this.loginForm =  this.formBuilder.group({

       email :new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(4)])
    });


    console.log("token",this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token'))));

    this.user = this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token')));

     console.log("role",this.role= this.user.role[0]);

  }


  loginUser(){
    let loginRequest= {
      email :this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.isLoading = true;
    return this.http.postElement(API_URI + url.login, loginRequest).subscribe(data => {

      console.log(data);

      this.isLoading =true;

       this.http.sessionset('token', JSON.stringify(data.token));

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



  get email(){
     return this.loginForm.controls['email'];
  }
  get password(){
    return this.loginForm.controls['password'];
 }


}
