import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class User {

  constructor(email: string, password: string) {
    if(email){
      
    }
  }

}

//Class for the authentication service
@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  public async login(){

  }

  public async register(user: User){
    if()
  }

}
