// import './app/app.element.ts';

import 'reflect-metadata';

// import { FooComponent } from './app/foo/foo.component';
// import { bootstrapComponent } from './lib/index';

import { FooModule } from './app/foo/foo.module';
import { bootstrapModule } from './lib/bootstrap-module';

const appRoot: HTMLElement = document.getElementById('app-root');
// bootstrapComponent(appRoot, FooComponent);
bootstrapModule(appRoot, FooModule)