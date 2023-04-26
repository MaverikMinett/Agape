export interface ComponentParams {
  selector?: string;
  template?: string;
}

export function Component( params: ComponentParams ) {
  return function Component( target: any ) {
    target['ɑparams'] = params;
  }
}

