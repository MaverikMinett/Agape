import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LeakyTimerComponent } from './leaky-timer/leaky-timer.component';
import { TimerWithTakeUntilComponent } from './timer-with-take-until/timer-with-take-until.component';
import { IndexPageComponent } from './index-page/index-page.component';

@NgModule({
  declarations: [AppComponent, IndexPageComponent, LeakyTimerComponent, TimerWithTakeUntilComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
