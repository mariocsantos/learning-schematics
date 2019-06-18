import {AfterViewInit, Component, OnDestroy, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import {UiToolbarService, UiElement, UiSnackbar} from 'ng-smn-ui';
import {Title} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {ApiService} from '../../../../../core/api/api.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'status-negocio-lista',
    templateUrl: './status-negocio.lista.component.html',
    styleUrls: ['status-negocio.lista.component.scss']
})

export class StatusNegocioListaComponent implements OnInit, AfterViewInit, OnDestroy {
    statusNegocio: any;
    filtros: any;

    searchOpen: boolean;
    searchText: string;
    searching: boolean;

    pagina;
    totalRegistros;
    loading: boolean;

    statusParaDeletar: any;

    private searchTerms = new Subject<string>();

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService,
                private api: ApiService,
                private changeDetectorRef: ChangeDetectorRef,
                private element: ElementRef) {
        this.statusNegocio = [];

        this.loading = false;
        this.pagina = 1;
        this.filtros = {
            quantidade: 10
        };
    }

    search(term: string) {
        this.searchTerms.next(term);
    }

    ngOnInit() {
        this.searchTerms
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.searchText || this.searchText.length <= 200) {
                    this.searching = true;
                    this.getStatus();
                }
            });
        this.titleService.setTitle('Otus - Status de negócio');
    }

    ngAfterViewInit() {
        this.toolbarService.set('Status de negócio');
        this.toolbarService.activateExtendedToolbar(480);

        this.getStatus();
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    toggleSearch() {
        const inputSearch = this.element.nativeElement.querySelectorAll('input[name="searchText"]')[0];

        if (this.searchOpen) {
            this.searchOpen = false;
            UiElement.closest(inputSearch, 'form').style.right = '';
            this.searchText = '';
            this.getStatus();
        } else {
            this.searchOpen = true;
            UiElement.closest(inputSearch, 'form').style.right = UiElement.closest(inputSearch, '.align-right').clientWidth + 'px';

            setTimeout(() => {
                inputSearch.focus();
            }, 200);
        }
    }

    getStatus() {
        this.loading = true;
        this.filtros.filtro = this.searchText || '';
        this.filtros.pagina = this.searchText ? 1 : this.pagina;

        this.api
            .prep('oportunidade', 'statusNegocio', 'selecionar')
            .call(this.filtros)
            .subscribe(res => {
                this.statusNegocio = res.content.registros;
                this.totalRegistros = res.content.totalRegistros;
            }, null, () => {
                this.loading = false;
                this.searching = false;
            });
    }

    deleteStatus(status): void {
        this.loading = true;

        this.api
            .prep('oportunidade', 'statusNegocio', 'excluir')
            .call({
                id: status.id
            })
            .subscribe(() => {
                this.statusNegocio = this.statusNegocio.filter(obj => obj !== status);

                if (this.statusNegocio.length && this.totalRegistros > 0) {
                    this.pagina = this.pagina <= 1 ? 1 : this.pagina - 1;
                    this.getStatus();
                } else  {
                    this.getStatus();
                }
                UiSnackbar.show({
                    text: status.nome + ' excluído com sucesso'
                });
            }, null, () => {
                this.loading = false;
            });
    }

    prepareToDelete(status) {
        this.statusParaDeletar = status;
    }
}
