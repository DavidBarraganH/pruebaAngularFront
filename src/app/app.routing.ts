import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Componentes
import { PaletteComponent } from './components/palette/palette.component';

//Arreglo de rutas:
const appRoutes: Routes = [
    {path: '', component: PaletteComponent},
];

//exportar modulo de rutas:

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

