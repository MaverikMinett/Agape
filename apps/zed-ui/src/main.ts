// import './app/app.element.ts';

import 'reflect-metadata';

// import { FooComponent } from './app/foo/foo.component';
import { bootstrapComponent } from './lib/index';

const appRoot: HTMLElement = document.getElementById('app-root');
bootstrapComponent(appRoot);
