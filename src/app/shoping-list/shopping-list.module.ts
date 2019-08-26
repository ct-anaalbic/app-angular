import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';


@NgModule({
    declarations: [ShoppingListComponent, ShopingEditComponent],
    imports: [CommonModule, FormsModule, ShoppingListRoutingModule],
})

export class ShoppingListModule {

}
