import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RutaPerfilComponent } from './rutas/ruta-perfil/ruta-perfil.component';
import { Ruta404Component } from './rutas/ruta404/ruta404.component';
import { RutaMenuComponent } from './rutas/ruta-menu/ruta-menu.component';
import { RutaGestionUsuariosComponent } from './rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import { RutaGestionProductosComponent } from './rutas/ruta-gestion-productos/ruta-gestion-productos.component';
import { RutaDetalleUsuarioComponent } from './rutas/ruta-detalle-usuario/ruta-detalle-usuario.component';
import { UsuarioServiceComponent } from './services/usuario-service/usuario-service.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioComponent,
    RutaLoginComponent,
    RutaPerfilComponent,
    Ruta404Component,
    RutaMenuComponent,
    RutaGestionUsuariosComponent,
    RutaGestionProductosComponent,
    RutaDetalleUsuarioComponent,
    UsuarioServiceComponent
  ], //Components
  imports: [
    BrowserModule,
    AppRoutingModule
  ], //Modulos
  providers: [], //Servicios
  bootstrap: [AppComponent] //Componente Principal
})
export class AppModule { }
