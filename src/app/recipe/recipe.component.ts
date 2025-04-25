import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NgFor, NgIf } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-recipe',
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {

  recipeDetails:any = {
    name: null
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    console.log('recipe', this.recipeService.getSelectedRecipe());
    this.recipeDetails = this.recipeService.getSelectedRecipe();
    console.log('this.recipeDetails', this.recipeDetails)
  }
}
