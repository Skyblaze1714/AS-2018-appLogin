import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider, User } from '../../providers/auth/auth'
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register';

/**
 * Classe della pagina  di login
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Credenziali per il login
  loginCredentials: User = {
    email:'',
    password: ''
  }
  loading: Loading;
 
  constructor(private nav: NavController, private auth: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
  //Metod per spostarsi alla pagina di regitrazione
  public createAccount() {
    this.nav.push(RegisterPage);
  }
 
  //Metodo per eseguire il login con le credenziali dell'utente tramite auth provider
  public login() {
    this.showLoading()
    this.auth.login(this.loginCredentials).subscribe(allowed => {
      //Se l'esito del login è positivo si viene portati alla home dell'app
      if (allowed) {        
        this.nav.setRoot(HomePage).then(() => {});
      //Altrimenti viene mostrato un pop up di errore
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  //Metodo per mostrare all'utente che viene effettuato un caricamento
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  //Mostra all'utente un pop up di errore
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
