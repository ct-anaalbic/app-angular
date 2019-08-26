import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
    recipeEmitter = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is simply a test',
            'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/crab-asparagus-pappardelle.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 1)
            ]),
        new Recipe('A Test Recipe1',
            'This is simply a test 1',
            'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,h_436,q_auto/v1/hellofresh_s3/image/5ad0b4c3ae08b51e0e19ff34-14952d03.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ];

    getRecipes() {
        return this.recipes.slice();

    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeEmitter.next(this.recipes.slice())
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipes(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeEmitter.next(this.recipes.slice());
    }

    updateRecipe(id: number, recipe: Recipe) {
        this.recipes[id] = recipe;
        this.recipeEmitter.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipeEmitter.next(this.recipes.slice());
	}
}
