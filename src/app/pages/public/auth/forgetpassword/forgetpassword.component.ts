import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [MessageService]
})
export class ForgetpasswordComponent implements OnInit{

  forgotForm: FormGroup = Object.create(null);
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


    this.forgotForm =  this.formBuilder.group({

      "email" : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
}


  sendEmail(){

  }


  get email(){
    return this.forgotForm.controls['email'];
  }


}