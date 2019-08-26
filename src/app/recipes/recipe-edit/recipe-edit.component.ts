import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'recipeDescription': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  clearIngredient(index: number) {
    const ingredientArray = (<FormArray> this.recipeForm.get('ingredients'));
    ingredientArray.removeAt(index);
  
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    // const controls = this.recipeForm.controls;
    const ingredientArray = this.recipeForm.value['ingredients'];
    const ingredientName = this.recipeForm.value['name']
    const ingredientDescription = this.recipeForm.value['recipeDescription'];
    const ingredientImage = this.recipeForm.value['imagePath'];
    // const listOfIngredient = [];

    // ingredientArray.controls.forEach(ingredient => {listOfIngredient.push(ingredient.value); console.log(listOfIngredient)})

    // for(let ingredient of ingredientArray.controls) {
    //   listOfIngredient.push(ingredient.value)
    // }
    // console.log(listOfIngredient)
    // console.log(controls.name.value)
    console.log(this.recipeForm)
    const recipe = new Recipe(ingredientName, ingredientDescription, ingredientImage, ingredientArray);
    console.log('Recipeee', recipe)

    if(!this.editMode) {
      this.recipeService.addRecipes(recipe);
    } else {
      this.recipeService.updateRecipe(this.id, recipe);
    }

    this.cancelAddingOrEditing();
  }

  cancelAddingOrEditing() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
