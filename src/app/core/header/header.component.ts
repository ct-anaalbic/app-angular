import {Component, HostBinding} from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class Header {
content = 'This is header';
isOpenMenu = false;

constructor(private dataStorageService: DataStorageService, public authService: AuthService) {}

openMenu() {
    this.isOpenMenu = !this.isOpenMenu;
}

onSaveData() {
this.dataStorageService.storeRecipes().subscribe(
    (response) => {
        console.log(response);
    }
);
}

onFetchData() {
    this.dataStorageService.fetchRecipes();
}

onLogedOut() {
    this.authService.loggedOut();
}

}
