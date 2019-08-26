import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import * as ShoppingListReducer from './shoping-list/store/shopping-list.reducers';
import * as ShoppingListActions from './shoping-list/store/shopping-list.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-first-project';
  link = 'recipe';
//   printedNumber: number = 2;

  constructor(private store: Store<ShoppingListReducer.AppState>) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBEHJRuYzowKvv5B0LbhjnH2zOt7CMrP6g',
      authDomain: 'recipe-book-9f379.firebaseapp.com'
    });
  }

  selectLink(event) {
    this.link = event;
  }
}

