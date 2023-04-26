// import './app/app.element.ts';

import 'reflect-metadata';

import { FooComponent } from './app/foo/foo.component';
import { bootstrapComponent } from './lib/ui';

const appRoot: HTMLElement = document.getElementById('app-root');
bootstrapComponent(FooComponent, appRoot);
