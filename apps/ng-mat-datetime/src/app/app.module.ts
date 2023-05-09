import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import env from '../environments/environment';
import { EnvironmentModule } from './shared/environment/environment.module';

import { AppIndexPageComponent } from './app-index-page.component';
import { DatetimeControlsModule } from './datetime-controls/datetime-controls.module';

@NgModule({
  declarations: [AppComponent, AppIndexPageComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    EnvironmentModule.forRoot(env),
    DatetimeControlsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
