import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent  implements OnInit{
  equipes: any;
  selectElement: any;

  balanceFrozen: boolean = false;
  member:any;
  filterForm: FormGroup = Object.create(null);
  value:any;
  display: boolean = false;
  ngOnInit(): void {

    this.filterForm = new FormGroup ({
      'nom': new FormControl(''),
    })
     
  this.getEquipes();
  this.getmenbres();

  
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
