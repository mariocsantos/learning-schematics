import {Component, OnInit, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {Location} from '@angular/common';
import {UiSnackbar, UiToolbarService} from 'ng-smn-ui';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../../core/api/api.service';

@Component({
    selector: 'status-negocio-info',
    templateUrl: './status-negocio.info.component.html',
    styleUrls: ['status-negocio.info.component.scss']
})

export class StatusNegocioInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    info: any;

    newRegister: boolean;
    loading = true;
    saving: boolean;
    editing: boolean;

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService,
                private element: ElementRef,
                private api: ApiService,
                private route: ActivatedRoute,
                private location: Location) {
        this.info = {};
        this.loading = true;
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (this.route.snapshot.params['id']) {
            this.toolbarService.set('Alterar status de negócio');
            this.titleService.setTitle('Otus - Alterar status de negócio');
            setTimeout(() => {
                this.newRegister = false;
                this.editing = true;
            });
            this.listarPorId();
        } else {
            this.toolbarService.set('Novo status de negócio');
            this.titleService.setTitle('Otus - Novo status de negócio');
            setTimeout(() => {
                this.newRegister = true;
                this.loading = false;
            });
        }

        this.focusElement('#nome-status-negocio');
        this.toolbarService.activateExtendedToolbar(480);
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    confirmar(form) {
        if (!this.saving) {
            for (const control in form.controls) {
                if (form.controls.hasOwnProperty(control)) {
                    form.controls[control].markAsTouched();
                    form.controls[control].markAsDirty();
                }
            }

            if (!form.valid) {
                this.element.nativeElement.querySelectorAll('form .ng-invalid')[0].focus();
                return false;
            }

            this.saving = true;
            const id = this.route.snapshot.params['id'];

            if (this.newRegister) {
                this.api
                    .prep('oportunidade', 'statusNegocio', 'cadastrar')
                    .call(this.info)
                    .subscribe(() => {
                        UiSnackbar.show({
                            text: this.info.nome + ' cadastrado com sucesso'
                        });
                        this.voltar();
                    }, null, () => {
                        this.saving = false;
                    });
            } else {
                this.api
                    .prep('oportunidade', 'statusNegocio', 'alterar')
                    .call(this.info, {
                        id: id
                    })
                    .subscribe(() => {
                        UiSnackbar.show({
                            text: this.info.nome + ' alterado com sucesso'
                        });
                        this.voltar();
                    }, null, () => {
                        this.saving = false;
                    });
            }
        }
    }

    listarPorId() {
        const id = this.route.snapshot.params['id'];

        this.api
            .prep('oportunidade', 'statusNegocio', 'buscar')
            .call({
                id: id
            })
            .subscribe(res => {
                this.info = res.content;
                this.focusElement('#nome-status-negocio');
            }, null, () => {
                this.loading = false;
            });
    }

    focusElement(selector, withDelay?) {
        setTimeout(() => {
            this.element.nativeElement.querySelector(selector).focus();
        }, withDelay ? 280 : 0);
    }

    voltar() {
        this.location.back();
    }
}
