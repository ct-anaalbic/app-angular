import * as firebase from 'firebase';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {}

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
    }

    signInUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
         (response) => {
             this.router.navigate(['/']);
             firebase.auth().currentUser.getIdToken()
             .then(
                 (token) => {
                     this.token = token;
                 }
             );
            //  localStorage.setItem('user', JSON.stringify(response.user));
         }
        )
        .catch(
            error => console.log(error)
        );
    }

    loggedOut() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
        .then(
            (token) => this.token = token
        );
        return this.token;        
    }

    isAuthentication() {
    return this.token != null;
    }

}
