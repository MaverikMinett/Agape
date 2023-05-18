import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { AppHomeComponent } from './components/app-home/app-home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

import { JwtModule } from "@auth0/angular-jwt";
export function tokenGetter() {
  return localStorage.getItem("token");
}

export const appRoutes: Route[] = [

  { path: '', component: AppHomeComponent }

];


@NgModule({
  declarations: [
    AppComponent, 
    AppHomeComponent,
  ],
  imports: [
    /* Angular */
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    
    /* JWT */
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:3007"]
      },
    }),

    /* Material */
    MatInputModule,

    /* Application */
    AdminModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}