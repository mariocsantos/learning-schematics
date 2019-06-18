import {Component, OnInit, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import {ApiService} from '../../../../../core/api/api.service';

@Component({
    selector: 'app-<%= dasherize(name) %>-detalhes',
    templateUrl: './<%= dasherize(name) %>.detalhes.component.html',
    styleUrls: ['<%= dasherize(name) %>.detalhes.component.scss']
})

export class <%= classify(name) %>DetalhesComponent extends Base implements OnInit {
    
    params: any;

    constructor(private api: ApiService,
                private route: ActivatedRoute,
                private location: Location) {
        super('Titulo', <%= size %>);
    }

    ngOnInit() {
        this.params = this.route.snapshot.params.id;
    }

    buscarPorId() {

    }

    inserir() {
        this.salvar();
    }

    alterar() {
        this.salvar();
    }

    salvar() {

    }

    remover() {

    }
}
