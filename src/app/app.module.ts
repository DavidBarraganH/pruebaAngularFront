

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material-module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { PaletteComponent } from './components/palette/palette.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AccessBankService } from './services/access.bank.service';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';



@NgModule({
  
  declarations: [
    AppComponent,
    UsuariosComponent,
    FormularioRegistroComponent,
    PaletteComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing, // es un modulo
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    appRoutingProviders, // es un servicio
    DatePipe,
    AccessBankService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
