import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/services/response.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit{


  users: any[]=[];
  display: boolean = false;
  display1: boolean = false;
  roleDisplay: boolean = false;
  registerForm: FormGroup = Object.create(null);
  updateRoleForm: FormGroup = Object.create(null);
  selectElement: any;
  role: any[] = [];
  label: string = '';
  permission: any;
  disabled:boolean = true;
  DiselectElement:any
    user: any
  constructor(private http: ResponseService,private messageService: MessageService, private tokenService:TokenService) {

  }

  ngOnInit(): void{

    this.getUsers();
    this.getRoles();

       this.registerForm = new FormGroup({
       'username': new FormControl('',[Validators.required]),
       //'email' : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
       'role': new FormControl([],[Validators.required])
     });

     this.updateRoleForm = new FormGroup({
         'role': new FormControl('',[Validators.required])
     })

     this.label="Ajout d'un utilisateur"

     console.log("token",this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token'))));


  }
onRowSelect(dat : any) : void {
  console.log('Data : ', dat);
  this.selectElement = dat;
  this.selectDisable();
 
}

getData(dat : any) : void {

  console.log('Ma selection', dat);

}

  


 


  getRoles(){

    this.user = this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token')));

    this.permission= this.user.role[0]

     if(this.permission=='MANAGER'){

    

        return this.role =[{
          nom: 'USER',
          'id': 1

        }]
     }else{

      return this.role= [{
        nom: 'USER',
        'id': 1
      },
      {
        nom: 'ADMIN',
        'id': 2
      },
      {
        nom: 'MANAGER',
        'id': 2
      },
  
      ]

     }
  }

    showDialog() {
        this.display = true;
    }

    showRoleDialog(){

      this.roleDisplay = true;
    }


    hideDialog(){

      this.display = false;
      this.roleDisplay = false;
      this.registerForm.reset();
      this.updateRoleForm.reset();
    }


    getUsers(){
    this.http.getElement(API_URI + url.list_users).subscribe({
      next: data => {
        if (data) {
          console.log("Mes users ", data);
          this.users = data;

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

    createUser(){
        
      let addUserRequest= {
        username :this.registerForm.value.username,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role
      };

      this.http.postElement(API_URI + url.create_user,addUserRequest).subscribe({

        next: data =>{

          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:"Compte créer avec succés",
            life: 3000
          });

          this.getUsers();
          console.log("data",data);
          this.registerForm.reset();
          this.hideDialog();

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


    userRolePreview(){

      this.updateRoleForm.patchValue({

        'role' : this.selectElement.data.role

      })

      this.showRoleDialog();

        
    }

    
     updateUserRole(){

      let updateRoleRequest= {
        role :this.updateRoleForm.value.role,
        userId: this.selectElement.data.id
      };

      this.http.postElement(API_URI + url.role_update,updateRoleRequest).subscribe({

        next: data =>{

          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:"Rôle modifier avec succés",
            life: 3000
          });

          this.getUsers();
          this.updateRoleForm.reset();
          this.hideDialog();

        },
        error: error => {
          console.log('error!', error.details);

          this.messageService.add({
            severity: 'error',
            summary: 'Forbidden',
            detail: 'you are not authorized !',
            life: 3000
          });
      }
      })

     }


      selectDisable(){
         
        if(this.selectElement.data.id>=1){
          this.disabled = !this.disabled;
        }
        else{
          this.disabled = true;
        }
       
      }

      get password(){
        return this.registerForm.controls['password'];
     }
    

  

}
