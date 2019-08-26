import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../../shoping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shoping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
  private router: Router,
  private recipeService: RecipeService, private store: Store<fromShoppingList.State>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      },
    );
  }

  addToShoppingList() {
	this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  navigateToEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
