import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= classify(name) %>ListaComponent } from './lista/<%= dasherize(name) %>.lista.component';
import { <%= classify(name) %>DetalhesComponent } from './detalhes/<%= dasherize(name) %>.detalhes.component';

const routes: Routes = [
    { path: '', component: <%= classify(name) %>ListaComponent },
    { path: 'novo', component: <%= classify(name) %>DetalhesComponent },
    { path: ':id', component: <%= classify(name) %>DetalhesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule {
}