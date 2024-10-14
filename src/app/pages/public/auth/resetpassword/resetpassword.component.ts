import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit{


  resetForm: FormGroup = Object.create(null);
  errorMessage: string = "";
  charge: Observable<any> = new Observable<any>();
  user: any;
  role:any;
  loading: boolean = false;
  isLoading = false;
  token: any;
  constructor(private http: ResponseService, private formBuilder: FormBuilder,private messageService: MessageService,
     private router: Router,private httpService:ResponseService,private api: ApiUrlService,private activatedRoute: ActivatedRoute,private message:MessageService) {
    this.user = JSON.parse(this.httpService.getUser());
  }

  ngOnInit(): void {


    this.resetForm =  this.formBuilder.group({

      password : new FormControl('', [Validators.required,Validators.minLength(4)]),
      confirm_password : new FormControl('', [Validators.required,Validators.minLength(4)]),
    });

    this.activatedRoute.queryParams.subscribe((token: Params) => {
      this.token = token;
      console.log("token",this.token.token);
    });
}


  resetPassword(){

    
    if(this.resetForm.get('password')?.value!= this.resetForm.get('confirm_password')?.value){
       
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail:"Les mots de passe doivent être identique.",
        life: 3000
      }); 

    }else{

      
      let resetRequest= {
        token :this.token.token,
        password: this.resetForm.value.password
      };

      console.log("request",resetRequest);
      this.loading = true;
      
      this.http.postElement(this.api.API_URI + "user/reset-password",resetRequest).subscribe({

        next: data =>{
  
          this.message.add({
            severity: 'success',
            summary: 'success',
            detail:"Mot de passe rinitialisé avec succés",
            life: 3000
          });
          this.loading = false;
          console.log("data",data);
          this.resetForm.reset();
          this.router.navigate(['/login']);
        },
        error: error => {
          console.log('error!', error);
          this.loading = false;
          this.message.add({
            severity: 'error',
            summary: error,
            detail: error.message,
            life: 3000
          });
      }
      })
  


    }

  }


  get password(){
    return this.resetForm.controls['password'];
  }
  get confirm_password(){
    return this.resetForm.controls['confirm_password'];
  }

}
