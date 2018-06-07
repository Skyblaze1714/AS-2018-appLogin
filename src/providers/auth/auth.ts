import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import * as md5 from 'md5';

//Interfaccia comune per le credenziali di un utenete
export interface User {
  email: string,
  password: string
}

// Classe per eseguire l'autenticazione dell'utente
@Injectable()
export class AuthProvider {

  currentUser: User;  //Utente corrente
  storage: Storage = new Storage({}); //Oggetto per l'interazione con l'archiviazione del dispositivo

  constructor() {}

  //Metodo per il login dell'utente
  public login(user: User){
    //Controllo per verificare la validità delle credenziali
    if (!user || user.email == null || user.password == null)
      return Observable.throw("Please insert credentials");
    else {
      return Observable.create(async observer => {
        let access: boolean = false;  //Variabile con l'esito dell'autenticazione

        //Controllo per verificare l'esistenza della mail nell'archiviazion
        if ((await this.storage.keys()).indexOf(user.email) != -1) {
          //Controllo dell'eguaglianza delle password
          if (md5(user.password) === await this.storage.get(user.email)) {
            access = true;
            this.currentUser = user;
          }
        }

        observer.next(access);
        observer.complete();
      });
    }
  }

  //Metodo per la registrazione dell'utente
  public register(user: User){
    //Controllo della validità delle credenziali
    if (!user || user.email == null || user.password == null)
      return Observable.throw("Invalid credentials");
    else {
      return Observable.create(async observer => {
        //Verica per non sovrascrivere un'email già utilizzata
        if (await this.storage.get(user.email) == undefined) {
          //Salvataggio del nuovo utente nell'archiviazione
          this.storage.set(user.email, md5(user.password))
            .then(() => observer.next(true))
            .catch(() => observer.next(false));
            observer.next(true);
        }
        else {
          observer.next(false);
        }
        observer.complete();
      });
    }
  }

}
