



export async function navigateToView(view: (...args:any[]) => any, params?: any) {
    return view(params)
}

export async function executeController(controller: (...args:any[]) => any, ...params: any[]) {
    return controller(...params)
}