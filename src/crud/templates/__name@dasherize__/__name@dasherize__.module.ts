import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '<%= findSharedModule() %>/shared.module';

import { <%= classify(name) %>ListaComponent } from './lista/<%= dasherize(name) %>.lista.component';
import { <%= classify(name) %>DetalhesComponent } from './detalhes/<%= dasherize(name) %>.detalhes.component';


@NgModule({
    imports: [
        SharedModule,
        <%= classify(name) %>RoutingModule
    ],
    exports: [],
    declarations: [
        <%= classify(name) %>ListaComponent,
        <%= classify(name) %>DetalhesComponent,
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class <%= classify(name) %>Module {
}
