import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiUrlService } from 'src/app/services/api-url.service';
import { ResponseService } from 'src/app/services/response.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit{


  
  users: any[]=[];
  display: boolean = false;
  updatebtn: boolean = false;
  deletebtn: boolean = false;
  display1: boolean = false;
  cols: any[] = [];
  roleDisplay: boolean = false;
  registerForm: FormGroup = Object.create(null);
  updateRoleForm: FormGroup = Object.create(null);
  selectElement: any;
  loading = true;
  role: any[] = [];
  label: string = '';
  permission: any;
  modifierbtn: boolean =false;
  activatebtn: boolean = false;
  exportColumns: any[] = [];
  unactivatebtn: boolean = false;
  detailbtn: boolean = false;
  disabled:boolean = true;
  maSelection: any[] = [];
    user: any
  etablissement: any;
  etabId: any;
  updateDisplay: boolean = false;
  boolvalue: any[]=[];
  element: any;

  constructor(private api:ApiUrlService,private confirmationService: ConfirmationService,private http: ResponseService,private messageService: MessageService, private tokenService:TokenService) {

  }

  ngOnInit(): void{

    this.getUsers();
    this.getRoles();
    this.getEtablissemnt();
    this.getExpired();
       this.registerForm = new FormGroup({
       'username': new FormControl('',[Validators.required]),
       'email' : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
       'role': new FormControl([],[Validators.required]),
       'etablissement_id': new FormControl(''),
       'expired': new FormControl('',Validators.required),
       'expiredDate': new FormControl('')
     });

     this.updateRoleForm = new FormGroup({
         'role': new FormControl('',[Validators.required])
     })

     this.label="Ajout d'un utilisateur"

     console.log("token",this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token'))));

     this.cols = [
      {field: 'username', header: 'Nom', type: 'string', width: 200, isFroz: true},
      {field: 'nomEtablissement', header: 'Etablissement', type: 'string', width: 200, isFroz: false},
       { field: 'email', header: 'Email', type: 'string', width: 200, isFroz: false },
       { field: 'role', header: 'Role', type: 'string', width: 200, isFroz: false },
        { field: 'createBy', header: 'Ajouter par', type: 'string', width: 200, isFroz: false },
        { field: 'expired', header: 'Expire', type: 'boolean', width: 200, isFroz: false },
        {field: 'expiredDate', header: 'Expire le', type: 'date', width: 200, isFroz: false},
        {field: 'date', header: 'Créer le', type: 'jour', width: 200, isFroz: false},




    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));


  }
onRowSelect(dat : any) : void {

  this.selectElement = dat;
this.maSelection = dat;
console.log('mes elements selectionner', this.maSelection);
this.manageActivateBtn();
this.manageUnactivateBtn();
this.manageDeleteBtn();
  this.manageUpdateBtn();
  this.manageDetailsBtn();
 
}

getData(dat : any) : void {

  console.log('Ma selection', dat);

}

  


 


  getRoles(){

    this.user = this.tokenService.DecodeToken(JSON.stringify(this.http.sessionget('token')));

   // this.permission= this.user.role[0]

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

  getExpired(){

    this.boolvalue = [
      { val: 'OUI', 'ids': true },
      { val :  'NON', 'ids':false}
     ]

  }

    showDialog() {
        this.display = true;
     
    }

    showRoleDialog(){

      this.roleDisplay = true;
    }

    updatedialog(){

      this.updateDisplay = true;
    }


    hideDialog(){

      this.display = false;
      this.roleDisplay = false;
      this.updateDisplay = false;
      this.registerForm.reset();
      this.updateRoleForm.reset();
    }

            /**
     * Gérer le bouton Activer
     */
            manageActivateBtn(){
              if(this.selectElement.length == 0 || this.selectElement.length > 1 ){
                this.activatebtn = false;
              } else{
                this.activatebtn = true;
              }
            }
    
              /**
             * Gérer le bouton Désactiver
             */
            manageUnactivateBtn(){
              if(this.selectElement.length == 0 || this.selectElement.length > 1  ){
                this.unactivatebtn = false;
              } else {
                this.unactivatebtn =true;
              }
            }
    
    
         /**
           * Gérer le bouton Supprimer
           */
          manageDeleteBtn(){
            if(this.selectElement.length == 0 || this.selectElement.length > 1){
              this.deletebtn = false
            } else {
              this.deletebtn =true;
            }
          }
    
          /**
           * Gérer le bouton Modifier
           */
           manageUpdateBtn(){
            if(this.selectElement.length == 0 || this.selectElement.length > 1){
              this.updatebtn = false;
            } else {
              this.updatebtn = true;
            }
           }
    
        manageDetailsBtn() {
               if(this.selectElement.length == 0 || this.selectElement.length > 1){
              this.detailbtn = false;
            } else {
              this.detailbtn = true;
            }
    
        }

        getEtablissemnt(){
          this.http.getElement(this.api.API_URI + url.etablissement).subscribe({
            next: data => {
              if (data) {
                      this.etablissement = data.content;
                      this.etabId = this.etablissement.id;
                console.log("Mon etablissement ", this.etablissement);
          
      
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
    

    getUsers(){
    this.http.getElement(this.api.API_URI + url.list_users).subscribe({
      next: data => {
        if (data) {
          console.log("Mes users ", data);
          this.users = data.content;

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

    onChange(event: any) {
      console.log('event :' + event.value);
      this.element = event.value;
       
      }
    createUser(){
        
      let addUserRequest= {
        username :this.registerForm.value.username,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role,
        email: this.registerForm.value.email,
        etablissement_id:this.registerForm.value.etablissement_id,
        expired: this.registerForm.value.expired,
        expiredDate: this.registerForm.value.expiredDate
      };

      this.http.postElement(this.api.API_URI + url.create_user,addUserRequest).subscribe({

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
          console.log('error!', error);

          this.messageService.add({
            severity: 'error',
            summary: error,
            detail: error.message,
            life: 3000
          });
      }
      })

    }




    userPreview(){
      let dt = formatDate(this.selectElement[0]?.expiredDate, 'yyyy-MM-dd','en_US');

      this.registerForm.patchValue({

        'role' : this.selectElement[0].role,
        'username' : this.selectElement[0].username,
        'email' : this.selectElement[0].email,
        'expired': this.selectElement[0].expired,
        'expiredDate':dt

      })
      this.updateDisplay = true;
      this.registerForm.get('username')?.disable();
        
    }

    confirmDelete() {

      if (this.selectElement && this.selectElement.length > 0) {
  
        console.log("Suppression des éléments");
  
        this.confirmationService.confirm({
          message: 'Voulez vous supprimer cet utilisateur ?',
          icon: 'pi pi-info-circle',
          acceptLabel: 'Oui',
          rejectLabel: 'Nom',
          acceptButtonStyleClass: "p-button-info",
          rejectButtonStyleClass: "p-button-danger",
          accept: () => {
            this.deleteUser()
          }
        });
  
      }
    }
  deleteUser() {
    let id = this.selectElement[0].id;

    this.http.deleteElement(this.api.API_URI + url.delete_user + id).subscribe({

      next: data =>{

        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail:"Utilisateur supprimer avec succés",
          life: 3000
        });

        this.getUsers();
        console.log("data",data);
        this.registerForm.reset();
        this.hideDialog();

      },
      error: error => {
        console.log('error!', error);

        this.messageService.add({
          severity: 'error',
          summary: error,
          detail: error.message,
          life: 3000
        });
    }
    })

  }




    
     updateUser(){
      let id = this.selectElement[0].id;

      let updateUerRequest= {
        role :this.registerForm.value.role,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        expired: this.element==true?this.registerForm.value.expired:false,
        expiredDate: this.element==true?this.registerForm.value.expiredDate:null
      };

      console.log("request",updateUerRequest);
      this.http.putElement(this.api.API_URI + url.user_update + id,updateUerRequest).subscribe({

        next: data =>{

          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:"Utilisateur modifier avec succés",
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



      get password(){
        return this.registerForm.controls['password'];
     }
     get email(){
      return this.registerForm.controls['email'];
   }
   get username(){
    return this.registerForm.controls['username'];
   } 
    
   get _role(){
    return this.registerForm.controls['role'];
 }
 get expired(){
  return this.registerForm.controls['expired'];
}



  
  
    

}
