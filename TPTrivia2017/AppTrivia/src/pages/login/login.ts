import { Component } from '@angular/core';
//Llamar a refrencia Alert Controller
import { NavController, AlertController, NavParams} from 'ionic-angular';

//importamos la depencias de firebase, 
//cada mificacion que haga se actualiza en tiempo real y referencia a la base de datos
import { FirebaseListObservable, AngularFireDatabase, AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

import { TabsPage } from '../tabs/tabs';
import { TriviaPage } from '../trivia/trivia';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  idUsuario : string = "";
  usuario :string = "";
  clave : string = "";
  claveRep : string = "";
  mail : string = "";
  logged : boolean;

  users: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
              public alertController: AlertController, 
              public database: AngularFireDatabase,
              public angfire: AngularFire) {

      this.users = this.database.list('/Usuarios');          

  }

  Login()
  {
    if(this.ValidaCamposLog())
    {
      this.angfire.auth.login({
        email: this.mail,
        password: this.clave
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response)=>{
        console.log('Login success' + JSON.stringify(response));
        let currentuser= {
          email: response.auth.email
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.AlertMensaje("Bienvenido!!", "<h2>Usted ha ingresado al juego.</h2>");
        this.navCtrl.push(TabsPage, {
          email: this.mail,
          respCorrectas: "Abandono",
        });
      }).catch((error) => {
        console.log(error);
        this.AlertMensaje("Error de Ingreso!!", "<h2>El usuario o contraseña son invalidas.</h2>");
      })

      //this.navCtrl.push(TabsPage);

      
    }
    else{
      this.AlertMensaje("Atencion!!", "<h2>Debe completar los campos requeridos, gracias.</h2>");
    }  
        
    

  }
  Registrar()
  {
      if(this.ValidaCamposReg())
      {
        var user = {
          email: this.mail,
          password: this.clave
        }
        this.angfire.auth.createUser(user).then((response)=>{
        console.log('Registro' + JSON.stringify(response));
        let currentuser= {
          email: response.auth.email
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
            this.users.push({
            nombre: this.usuario,
            mail: this.mail,
            });
        this.AlertMensaje("Bienvenido", "Su perfil a sido guardado con exito!!!");
        this.navCtrl.push(TabsPage, {
          email: this.mail,
          respCorrectas: "Abandono",
        });
      }).catch((error) => {
        console.log(error);
        this.AlertMensaje("Error de Ingreso!!", "<h2>Ya hay un usuario registrado con este mail.</h2>");
      })
        // this.user.push({
        // nombre: this.usuario,
        // clave: this.clave,
        // claveRep: this.claveRep,
        // mail: this.mail,
      // });
      
      }
      else{
        this.AlertMensaje("Atencion!!", "<h2>Debe completar los campos requeridos, gracias.</h2>");
      }
      
    
  }

  ValidaCamposLog():boolean
  {
    if(this.mail == "")
      return false;
    
    if(this.clave == "")
      return false;

    return true;
  }

  ValidaCamposReg():boolean
  {
    if(this.usuario == "")
        return false;
  
    if(this.clave == "" || this.claveRep == "")
        return false;

    if(this.mail == "")
        return false;
    
    if(this.clave != this.claveRep)
        return false;
    
    return true;
  }

  AlertMensaje(titulo: string, mens: string)
  {
    
      let ventana = this.alertController.create({
      title: titulo,
      message: mens,
      buttons:[
        {
          text: "Aceptar",
          handler: data => {
            console.log('Mensaje de Alerta');
            }
          }
        ]

      });
      ventana.present(ventana);
    } 
  
}
