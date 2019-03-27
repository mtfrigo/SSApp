import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpensesPage } from './expenses.page';

import { ExpenseEditComponent } from './expense-edit/expense-edit.component'

const routes: Routes = [
  {
    path: '',
    component: ExpensesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ExpenseEditComponent],
  declarations: [ExpensesPage, ExpenseEditComponent]
})
export class ExpensesPageModule {}
