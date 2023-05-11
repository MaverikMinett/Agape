import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AppHomeComponent } from './app-home/app-home.component';

export const appRoutes: Route[] = [

  { path: '', component: AppHomeComponent }

];


@NgModule({
  declarations: [
    AppComponent, 
    AppHomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
