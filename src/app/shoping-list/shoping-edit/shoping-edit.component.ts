
import {
	Component, OnInit, OnDestroy, ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css'],
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
	  this.subscription = this.store.select('shoppingList')
	  .subscribe(
		  data => {
			  if (data.editedIngredientIndex > -1) {
				  this.editedItem = data.editedIngredient;
				  this.editMode = true;
				//   setTimeout(() => {
					this.slForm.setValue({
						name: this.editedItem.name,
						amount: this.editedItem.amount,
					  });
				//   })
				//   this.slForm.setValue({
				// 	name: this.editedItem.name,
				// 	amount: this.editedItem.amount,
				//   });
			  } else {
				  this.editMode = false;
			  }
		  }
	  )
  }

  onSubmit(form: NgForm) {
    const { value } = form;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
	this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    } else {
	this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
	this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
	  this.store.dispatch(new ShoppingListActions.StopEdit());
	  this.subscription.unsubscribe()
  }
}
