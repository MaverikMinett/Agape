// import './app/app.element.ts';

import 'reflect-metadata';

// import { FooComponent } from './app/foo/foo.component';
// import { bootstrapComponent } from './lib/index';

// import { FooModule } from './app/foo/foo.module';
import { AppModule } from './app/app.module'
import { bootstrapModule } from './lib/bootstrap-module';
import { RouterModule } from './lib/modules/router.module';




const appRoot: HTMLElement = document.getElementById('app-root');
bootstrapModule(appRoot, AppModule)

