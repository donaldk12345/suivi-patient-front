import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-first-change-password',
  templateUrl: './first-change-password.component.html',
  styleUrls: ['./first-change-password.component.css']
})
export class FirstChangePasswordComponent implements OnInit{

  
  user:any;
  profil:any;
  isLoading = false;
  disabled:boolean = false;
  updatePasswordForm: FormGroup= Object.create(null);
  constructor(private router: Router,private api:ApiUrlService,private http: ResponseService,private messageService: MessageService, private tokenService:TokenService) {

  }
  ngOnInit(): void {
   
    this.updatePasswordForm = new FormGroup({

      'currentPassword': new FormControl('',[Validators.required]),
      'newPassword': new FormControl('',[Validators.required,Validators.minLength(4)])
    })
  }



  changePassword(){

    let addpasswordRequest= {
      currentPassword :this.updatePasswordForm.value.currentPassword,
      newPassword: this.updatePasswordForm.value.newPassword
    };

   return this.http.postElement(this.api.API_URI + "user/password/update",addpasswordRequest).subscribe({

      next: data =>{

        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Mot de passe modifier avec succés",
          life: 3000
        });
        this.router.navigate(['/gestion/etablissement']);
        console.log("profile",data);
        this.updatePasswordForm.reset();

      },
      error: error => {
        console.log('error!', error.details);

        this.messageService.add({
          severity: 'error',
          summary: error,
          detail: error.details,
          life: 3000
        });
    }
    })

  }

  get currentPassword(){
    return this.updatePasswordForm.controls['currentPassword'];
  }
  get newPassword(){
    return this.updatePasswordForm.controls['newPassword'];
  }
}
