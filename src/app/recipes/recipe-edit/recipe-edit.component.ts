import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  editMode: boolean = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private recipeServive: RecipeService,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = Number.isFinite(this.id);        
        this.initForm();
      }
    )
  }


  onAddIngredient(){
    let newIngredient = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(newIngredient);
  }

  onSubmit(){
    if(this.editMode){
      this.recipeServive.updateRecipe(this.id, {id: this.id, ...this.recipeForm.value});
      this.router.navigate(['/recipes']);
    }else{
      this.recipeServive.addRecipe({...this.recipeForm.value});
      this.router.navigate(['/recipes']);
    }
    this.onCancel();
  }

  onCancel(){
    if(this.editMode){
      this.router.navigate(['..'], {relativeTo: this.route});
    }else{
      this.recipeForm.reset();
    }
  }

  onDeleteIngredient(idx: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx);
  }
  initForm(){
    console.log("initForm");
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients =  new FormArray([]);
    
    if(this.editMode){
      let recipe = this.recipeServive.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    });
  }
}
