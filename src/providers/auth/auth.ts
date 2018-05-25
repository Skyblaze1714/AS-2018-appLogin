import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'

export interface User {
  email: string,
  password: string
}

//Class for the authentication service
@Injectable()
export class AuthProvider {

  currentUser: User;
  storage: Storage = new Storage({});

  constructor() {
    console.log('Hello AuthProvider Provider');
    this.storage.set('prova', '1234').then(() => {})
    this.storage.get('prova').then(pass => console.log(pass));
  }

  public login(user: User){
    if (!user || user.email == null || user.password == null)
      return Observable.throw("Please insert credentials");
    else {
      return Observable.create(async observer => {
        let access: boolean = false;

        if ((await this.storage.keys()).indexOf(user.email) != -1) {
          if (user.password === await this.storage.get(user.email)) {
            access = true;
            this.currentUser = user;
          }
        }

        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(user: User){
    if (!user || user.email == null || user.password == null)
      return Observable.throw("Invalid credentials");
    else {
      return Observable.create(async observer => {
        if (await this.storage.get(user.email) != undefined) {
          this.storage.set(user.email, user.password)
            .then(() => observer.next(true))
            .catch(() => observer.next(false));
        }
        else {
          observer.next(false);
        }
        observer.complete();
      });
    }
  }

}
