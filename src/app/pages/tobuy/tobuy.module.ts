import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TobuyPage } from './tobuy.page';

import { ItemEditComponent } from './item-edit/item-edit.component'

const routes: Routes = [
  {
    path: '',
    component: TobuyPage
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
  entryComponents: [ItemEditComponent],
  declarations: [TobuyPage, ItemEditComponent]
})
export class TobuyPageModule {}
