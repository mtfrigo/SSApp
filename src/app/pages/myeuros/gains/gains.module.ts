import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GainsPage } from './gains.page';

import { GainEditComponent } from './gain-edit/gain-edit.component'

const routes: Routes = [
  {
    path: '',
    component: GainsPage
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
  entryComponents: [GainEditComponent],
  declarations: [GainsPage, GainEditComponent]
})
export class GainsPageModule {}
