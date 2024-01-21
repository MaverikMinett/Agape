import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { EmployeesModule } from './employees/employees.module';
import { FacilitiesModule } from './facilities/facilities.module';

import { AppIndexComponent } from './core-components/app-index/app-index.component';
import { AppMenuComponent } from './core-components/app-menu/app-menu.component';


@NgModule({
  declarations: [
    AppComponent, 
    AppIndexComponent,
    AppMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    EmployeesModule,
    FacilitiesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
