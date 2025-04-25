import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { RecipeComponent } from './recipe/recipe.component';

export const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'recipe', component: RecipeComponent },
];
