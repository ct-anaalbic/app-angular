import { NgModule } from '@angular/core';
import { Header } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoginInterceptor } from '../shared/login.interceptor';

@NgModule({
    declarations: [Header, HomeComponent],
    imports: [
        SharedModule, AppRoutingModule,
    ],
    exports: [AppRoutingModule, Header],
    providers: [
        RecipeService,
        DataStorageService,
		AuthService,
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true}
    ],
})
export class CoreModule {

}
