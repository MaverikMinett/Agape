import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { EventsModule } from './events/events.module';
import { ApiSelectorModule } from './api-selector/api-selector.module';

import env from '../environments/environment';
import { EnvironmentModule } from './shared/environment/environment.module';
import { EventsReactiveFormsModule } from './events-reactive-forms/events.module';
import { EventsTemplateFormsModule } from './events-template-forms/events.module';
import { AppIndexPageComponent } from './app-index-page.component';
import { EventsModelServiceModule } from './events-model-service/events.module';

@NgModule({
  declarations: [AppComponent, AppIndexPageComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    EnvironmentModule.forRoot(env),
    // EventsModule,
    EventsReactiveFormsModule,
    // EventsTemplateFormsModule,
    EventsModelServiceModule,
    ApiSelectorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
