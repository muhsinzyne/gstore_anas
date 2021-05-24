import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveAddressPageRoutingModule } from './save-address-routing.module';

import { SaveAddressPage } from './save-address.page';
import { PipesModule } from 'src/pipes/pipes.module';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: SaveAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SaveAddressPageRoutingModule
  ],
  declarations: [SaveAddressPage]
})
export class SaveAddressPageModule {}
