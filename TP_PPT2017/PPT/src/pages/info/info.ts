import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseListObservable, AngularFireDatabase, AngularFire, FirebaseAuthConfig } from 'angularfire2';


@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  // itemsEmp:string[];
  // itemsGan:string[];
  // itemsPer:string[];
  cadena:string= '[{"nombre":"Fer", "fecha":"04/05/2018","partida":"Empato"}]';
  cadenaJson:string;
  //public cadena = ['Fernando-04/05/2017','Gabiel-04/05/2017','Rodolfo-04/05/2017']; 
  nombre:string="Hola";
  fecha:string;

  items=[
    {nombre:"Fernando", fecha:"04/05/2017", partida:"Empato"},
    {nombre:"Rodrigo", fecha:"04/05/2017", partida:"Gano"},
    {nombre:"Robert", fecha:"04/05/2017", partida:"Perdio"},
    ];

registros:FirebaseListObservable<any[]>; 

  constructor(public navCtrl: NavController,
              public database: AngularFireDatabase,
              public angfire: AngularFire) {

                 this.registros = this.database.list('/Registros');
                console.log(this.registros);
                // this.itemsEmp=[];
                // this.itemsGan=[];
                // this.itemsPer=[];
                 
                 this.GenerarCadena();
                 
  }

   doRefresh(refresher){
     console.log("Llego a refrescar");
     if(refresher != 0)
        refresher.complete();
    // this.storage.get('myStore').then((data) => {
    //   this.items = data;
 
    //   if(refresher != 0)
    //      refresher.complete();
    // }); 
  };

  Actualizar()
  {
    this.cadena="";
    this.cadena = "[" + this.cadenaJson + '{"nombre":"Fer", "fecha":"04/05/2018","partida":"Empato"}]';
    console.log("Cadena:" + this.cadena);
      this.items = JSON.parse(this.cadena);
  }

  GenerarCadena()
  {
    var iE: number = 0;
    var iG: number = 0;
    var iP: number = 0;
    // this.items = this.registros;
    // console.log("A ver que pasa:" + this.items);
    
    this.cadenaJson="";
    var registro = this.registros
    .subscribe(valor => { valor.forEach(v =>{
      if(v.partida == "Empato" && iE < 10)
      {
        //this.itemsEmp.push(v.nombre + "-" + v.fecha);
        this.cadenaJson = this.cadenaJson + '{"nombre":"' + v.nombre + '","fecha":"' + v.fecha + '","partida":"' + v.partida+'"},';
        console.info("v.nombre1" + this.cadena);
        iE++;
      }
      if(v.partida == "Gano" && iG < 10)
      {
        //this.itemsGan.push(v.nombre + "-" + v.fecha);
        this.cadenaJson = this.cadenaJson + '{"nombre":"' + v.nombre + '","fecha":"' + v.fecha + '","partida":"' + v.partida+'"},';
        console.info("v.nombre2" + v.nombre);
        iG++;
      }
      if(v.partida == "Perdio" && iP < 10)
      {
          //this.itemsPer.push(v.nombre + "-" + v.fecha);
          this.cadenaJson = this.cadenaJson + '{"nombre":"' + v.nombre + '","fecha":"' + v.fecha + '","partida":"' + v.partida+'"},';
          console.info("v.nombre3" + v.nombre);
          iP++;
        }
      })

    });
    
    
    //this.items = JSON.parse(this.cadena);
    
  }



}
