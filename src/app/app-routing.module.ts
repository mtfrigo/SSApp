import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'myeuros', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'expenses', loadChildren: './pages/myeuros/expenses/expenses.module#ExpensesPageModule' },
  { path: 'categories', loadChildren: './pages/myeuros/categories/categories.module#CategoriesPageModule' },
  { path: 'gains', loadChildren: './pages/myeuros/gains/gains.module#GainsPageModule' },
  { path: 'myeuros', loadChildren: './pages/myeuros/myeuros.module#MyeurosPageModule' },
  { path: 'tobuy', loadChildren: './pages/tobuy/tobuy.module#TobuyPageModule' },
  { path: 'flux', loadChildren: './pages/myeuros/flux/flux.module#FluxPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
