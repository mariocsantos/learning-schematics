import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from '../../../../../core/api/api.service';

@Component({
    selector: 'app-<%= dasherize(name) %>-lista',
    templateUrl: './<%= dasherize(name) %>.lista.component.html',
    styleUrls: ['<%= dasherize(name) %>.lista.component.scss']
})

export class <%= classify(name) %>ListaComponent extends Base implements OnInit {

    constructor(private api: ApiService, private element: ElementRef) {
        super('Titulo', <%= size %>);
    }

    ngOnInit() {
    }

    buscar() {

    }

    remover() {

    }
}
