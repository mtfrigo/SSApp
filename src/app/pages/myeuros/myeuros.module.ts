import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyeurosPage } from './myeuros.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: MyeurosPage,
    children: [
      {
        path: 'gains',
        loadChildren: './gains/gains.module#GainsPageModule'
      },
      {
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesPageModule'
      }
      ,
      {
        path: 'categories',
        loadChildren: './categories/categories.module#CategoriesPageModule'
      }
      ,
      {
        path: 'flux',
        loadChildren: './flux/flux.module#FluxPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/expenses',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyeurosPage]
})
export class MyeurosPageModule {}
