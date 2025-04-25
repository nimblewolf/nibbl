;import {Component, input, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, filter, map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RecipeService } from '../../services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink
  ],
  providers: [HttpClient],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions: Observable<any[]> = of([]);

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(150),
      filter((input) => !!input && input.length > 1),
      switchMap((input: any) => {
        return this.recipeService.searchRecipe(input).pipe(
          take(1),
          map((result) => {
            this.options = result; 
            // const arrayResult = result?.map((data: any) => data.name) || [];
            // return arrayResult;
            return result;
          }),
          catchError((error) => {
            console.error(error);
            return [];
          })
        )
      }),
    );
  }

  navigateToRecipe(recipe: any) {
    this.recipeService.updateSelectedRecipe(recipe);
    this.router.navigate(['recipe']);
  }

}
