import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Classe della pagina  di registrazione
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;  //Variabile con l'esito della registrazione
  registerCredentials = { email: '', password: '' };  //Credenziali per la registrazione

  constructor(private nav: NavController, private auth: AuthProvider, private alertCtrl: AlertController) { }

  //Metodo per la registrazione dell'utente tramite auth provider
  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      //In caso di successo torn alla pagina di login
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      //Altrimenti mostra un pop up di errore
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  //Metodo per la creazione del pop up
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          //Qunado l'utente preme ok per chiudere il pop up viene riportato alla pagina di logi
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
