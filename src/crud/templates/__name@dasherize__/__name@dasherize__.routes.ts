import { Routes } from '@angular/router';
import { <%= classify(name) %>ListaComponent } from './lista/<%= dasherize(name) %>.lista.component';
import { <%= classify(name) %>DetalhesComponent } from './detalhes/<%= dasherize(name) %>.detalhes.component';

export const <%= upperWithUderscore(name) %>_ROUTES: Routes = [
    {
        <% if(route) { %>path: '<%= route %>/<%= dasherize(name) %>',<% } else { %>path: '<%= dasherize(name) %>',<% } %>
        loadChildren: 'src/app/views/main/<%= dasherize(name) %>/<%= dasherize(name) %>.module#<%= classify(name) %>Module',
        <% if(convertion) { %>data: { conversao: true }<% } %>
    }
];
