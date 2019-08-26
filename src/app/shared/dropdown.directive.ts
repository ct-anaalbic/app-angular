import { Directive, OnInit, TemplateRef, ViewContainerRef, Input, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toogleOpen() {
        this.isOpen = !this.isOpen;
    }

constructor() {}

ngOnInit() {

}

}