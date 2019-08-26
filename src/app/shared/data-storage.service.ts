import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

}

storeRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.put("https://recipe-book-9f379.firebaseio.com/recipes.json", this.recipeService.getRecipes(), {
	// 	observe: 'body',
	// 	params: new HttpParams().set('auth', token),
	// 	headers: new HttpHeaders().set('Authorization', 'Bearer afdklaskfoje')
	// });
	const req = new HttpRequest('PUT', "https://recipe-book-9f379.firebaseio.com/recipes.json", this.recipeService.getRecipes(), {
		reportProgress: true
	});
	return this.httpClient.request(req);
}

fetchRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.get<Recipe[]>("https://recipe-book-9f379.firebaseio.com/recipes.json")
    .map(
        (recipes) => {
            for (const recipe of recipes) {
                if (recipe.ingredients == null) {
                    console.log(recipe);
                    recipe.ingredients = [];
                }
            }
            return recipes;
        }
    )
    .subscribe(
        (recipes) => {
            this.recipeService.setRecipes(recipes);
        }
    );
}
}