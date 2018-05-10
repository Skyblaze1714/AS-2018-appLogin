import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class User {

  private _email: string;
  private _password: string;

  constructor(email: string, password: string) {
    if(email){
      
    }
  }

  get email(){return this._email}
  set email(email: string){

  }

  get password(){return this._password}
  set password(password: string){

  }

}

//Class for the authentication service
@Injectable()
export class AuthProvider {

  storgae: Storage = new Storage({});

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  public async login(){

  }

  public async register(user: User){
    if(User == null) {

    }
  }

}
