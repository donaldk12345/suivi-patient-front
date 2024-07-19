import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
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
  isLoading = false;
  constructor(private http: ResponseService, private formBuilder: FormBuilder,private messageService: MessageService,
     private router: Router,private httpService:ResponseService,private tokenService: TokenService) {
    this.user = JSON.parse(this.httpService.getUser());
  }

  ngOnInit(): void {


    this.resetForm =  this.formBuilder.group({

      password : new FormControl('', [Validators.required,Validators.minLength(4)]),
      confirm_password : new FormControl('', [Validators.required,Validators.minLength(4)]),
    });
}


  resetPassword(){

    
    if(this.resetForm.get('password')?.value!= this.resetForm.get('confirm_password')?.value){
       
      this.messageService.add({
        severity: 'warn',
        summary: 'warn',
        detail:"Les mots de passe doivent être identique.",
        life: 3000
      }); 

    }else{


    }

  }


  get password(){
    return this.resetForm.controls['password'];
  }
  get confirm_password(){
    return this.resetForm.controls['confirm_password'];
  }

}
