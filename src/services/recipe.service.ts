import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  private selectedRecipe$ = new BehaviorSubject(null);

  searchRecipe(input: string): Observable<any> {
    return this.http.get(`https://exsf415lj5.execute-api.ap-southeast-2.amazonaws.com/stage1/searchRecipe?name=${input}`);
  }

  updateSelectedRecipe(recipe:any): void {
    if (!recipe) {
      return;
    }

    this.selectedRecipe$.next(recipe);
  }

  getSelectedRecipe() {
    return this.selectedRecipe$.value;
  }
}
