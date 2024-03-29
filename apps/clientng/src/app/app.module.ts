import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { EventsModule } from './modules/events/events.module';
import { EnvironmentModule } from './shared/environment/environment.module';

import env from '../environments/environment';
import { ApiSelectorModule } from './modules/api-selector/api-selector.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    EnvironmentModule.forRoot(env),
    EventsModule,
    ApiSelectorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
