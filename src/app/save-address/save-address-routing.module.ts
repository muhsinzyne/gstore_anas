import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveAddressPage } from './save-address.page';

const routes: Routes = [
  {
    path: '',
    component: SaveAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveAddressPageRoutingModule {}
