import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { environment } from 'src/environments/enviroment';
import { url } from 'src/environments/url';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { of } from 'rxjs';
const API_URI= `${environment.BASE_URL}`
@Component({
  selector: 'app-chefequipe',
  templateUrl: './chefequipe.component.html',
  styleUrls: ['./chefequipe.component.css']
})
export class ChefequipeComponent implements OnInit{

  equipes: any;
  selectElement: any;
   result: any[]=[];
  balanceFrozen: boolean = false;
  member:any;
  filterForm: FormGroup = Object.create(null);
  value:any;
  display: boolean = false;
  donnees: any;
  equip: any;

  constructor(private http: ResponseService,private messageService: MessageService) {

  }
  ngOnInit(): void {

    this.filterForm = new FormGroup ({
      'nom': new FormControl(''),
    })
     
  this.getEquipes();
  this.getmenbres();
  this.getDonneesEquipe();
  this.dataGroup();

  
  }

  showDialog() {
    this.display = true;
}


hideDialog(){

  this.display = false;

}

  getEquipes(){

    this.equipes =[
      {
      'id':1,
      'equipe':'LMT_ ABDOU BAKARI',
      'identifier':1820,
      'rejeter': 165,
      'kabu': 1985,
      'total':0,
      'controle':0,
      'nok': 0,
      'ok':0,
      'conformite': 0

    }
  
  ]

  console.log("equipe",this.equipes);
  }

  getDataFilter() {
    return this.equipes.filter((item:any) => {
      return item[this.value] == this.value;
    })
  }

  getmenbres(){

    this.member=[
      {
        'id':1,
        'nom': 'BENUE' 
      },
      {
        'id':2,
        'nom': 'CHARIE'
      },
      {
        'id':3,
        'nom': 'EMAIL'
      },
      {
        'id':4,
        'nom': 'LOGONE'
      },  
      {
        'id':6,
        'nom': 'SUP'
      },
      {
        'id':7,
        'nom': 'WOURI'
      }
    ]

    console.log("member",this.member);
  }



  onRowSelect(dat : any) : void {
    console.log('Data : ', dat);
    this.selectElement = dat;
   
  }
  
  getData(dat : any) : void {
  
    console.log('Ma selection', dat);
  
  }

  getDonneesEquipe(){

    return this.http.getElement(API_URI + url.donnee_Equipe_list).subscribe({
      next: data => {
        if (data) {
          console.log("Mes donnees ", data);
          this.donnees= data;
             
              
            //console.log('hi',this.donnees.donnees[4]);
              
             
             /*this.equip.donnees.forEach((elt:any) => {
              console.log("elemnt",elt);
            });*/
       


        } else {
          this.messageService.add({
            severity: 'error',
            summary: data.error,
            detail: data.message,
            life: 3000
          });
        }
      }
    })
  
  }

dataGroup(){
  const posts = [
    {id: 1, title: 'Clean TypeScript', category: 'TypeScript', likes: 91},
    {id: 2, title: 'Stateless React',  category: 'React',      likes: 12},
    {id: 3, title: 'Functional Core',  category: 'TypeScript', likes: 65}
];

/*const worstPost = posts.reduce((worstPost, post) => worstPost.likes < post.likes ? worstPost : post);
console.log("woo",worstPost.title);*/

const categories = posts.reduce((categories, post) => categories.set(post.category, (categories.get(post.category) ?? 0) + post.likes), new Map<string, number>());
categories.forEach((likes, category) => {
    console.log(`${category} (${likes} likes)`)
});
  


}

  filterEquipe(event: any){

    console.log("value",event.value);

  }
  submitFilter(){

    let filerRequest = {

      nom: this.filterForm.value.nom
    }
    console.log(filerRequest);

  }



  filterSearch(){

  }

}
