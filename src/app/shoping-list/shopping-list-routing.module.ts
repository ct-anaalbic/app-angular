import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoute: Routes = [
    { path: '', component: ShoppingListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoute)],
    exports: [RouterModule],
})
export class ShoppingListRoutingModule {

}
