



export async function navigateToView(view: (...args:any[]) => any, params?: any, controllerResponse?: any) {
    return view(params, controllerResponse)
}

export async function executeController(controller: (...args:any[]) => any, ...params: any[] ) {
    return controller(...params)
}

export async function executeControllerAndNavigate( 
    controller: (...args:any[]) => any, 
    controllerParams: any[], 
    view: (...args:any[]) => any,
    viewParams?: any
    ) {
        const controllerResponse = await controller(...controllerParams);
        return view( viewParams, controllerResponse )
}