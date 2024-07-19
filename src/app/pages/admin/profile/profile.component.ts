import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user:any;
  profil:any;
  disabled:boolean = false;
  profileForm: FormGroup = Object.create(null);
  updatePasswordForm: FormGroup= Object.create(null);
  constructor(private api:ApiUrlService,private http: ResponseService,private messageService: MessageService, private tokenService:TokenService) {

  }

  ngOnInit(): void{


    this.getProfile();

    this.profileForm = new FormGroup({
      'prenom': new FormControl('',[Validators.required]),
      'poste': new FormControl('', [Validators.required]),
      'telephone': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'ville': new FormControl('', [Validators.required]),
      'quartier': new FormControl('',[Validators.required])
    });

    this.updatePasswordForm = new FormGroup({

      'currentPassword': new FormControl('',[Validators.required]),
      'newPassword': new FormControl('',[Validators.required,Validators.minLength(4)])
    })
    
  }


  createProfile(){
        
    let addProfileRequest= {
      prenom :this.profileForm.value.prenom,
      poste: this.profileForm.value.poste,
      telephone: this.profileForm.value.telephone,
      email :this.profileForm.value.email,
      ville: this.profileForm.value.ville,
      quartier: this.profileForm.value.quartier
    };

    this.http.postElement(this.api.API_URI + url.profile,addProfileRequest).subscribe({

      next: data =>{

        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Profile Ajouter avec succés",
          life: 3000
        });
        console.log("profile",data);
        this.profileForm.reset();
        this.getProfile();

      },
      error: error => {
        console.log('error!', error.details);

        this.messageService.add({
          severity: 'error',
          summary: error,
          detail: error.message,
          life: 3000
        });
    }
    })

  }

  getProfile(){
   return  this.http.getElement(this.api.API_URI + url.myprofile).subscribe({
      next: data => {
        if (data) {
          console.log("profile", data);
          this.profil = data;

          this.profileForm.get('prenom')?.setValue(data.prenom);
          this.profileForm.get('prenom')?.disable();
          this.profileForm.get('poste')?.setValue(data.poste);
          this.profileForm.get('poste')?.disable();
          this.profileForm.get('telephone')?.setValue(data.telephone);
          this.profileForm.get('telephone')?.disable();
          this.profileForm.get('email')?.setValue(data.email);
          this.profileForm.get('email')?.disable();
          this.profileForm.get('ville')?.setValue(data.ville);
          this.profileForm.get('ville')?.disable();
          this.profileForm.get('quartier')?.setValue(data.quartier);
          this.profileForm.get('quartier')?.disable();

        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Reésultat',
            detail: data.message,
            life: 3000
          });
        }
      }
    })
  }

  changePassword(){

    let addpasswordRequest= {
      currentPassword :this.updatePasswordForm.value.currentPassword,
      newPassword: this.updatePasswordForm.value.newPassword
    };

    this.http.postElement(this.api.API_URI + url.change_password,addpasswordRequest).subscribe({

      next: data =>{

        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Mot de passe modifier avec succés",
          life: 3000
        });
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

get prenom(){
      return this.profileForm.controls['prenom'];
}
get poste(){
    return this.profileForm.controls['poste'];
 }

get telephone(){
  return this.profileForm.controls['telephone'];
}
get email(){
  return this.profileForm.controls['email'];
}
get ville(){
  return this.profileForm.controls['ville'];
}
get quartier(){
  return this.profileForm.controls['quartier'];
}

get currentPassword(){
  return this.updatePasswordForm.controls['currentPassword'];
}
get newPassword(){
  return this.updatePasswordForm.controls['newPassword'];
}



}
