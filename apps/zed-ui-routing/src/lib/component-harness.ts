import { Class } from "@agape/types";
import { Component } from "./decorators/component";
import { ComponentDescriptor } from "./descriptors/component";

import { parse, walk, SyntaxKind } from 'html5parser';
import { ApplicationContext } from "./interfaces/application-context.interface";
import { html5tags } from "./html5-tags";


import { ModuleDescriptor } from "./descriptors/module";
import { ModuleContext } from "./module-container";


export interface TextNodeDescriptor {
    // start?: number
    // end: number
    value: string
    type: 'Text'|'Expression'
}

export class ComponentHarness<T extends Class> {

    descriptor: ComponentDescriptor

    instance: InstanceType<T>

    htmlTemplate: string

    dom: HTMLElement

    expressions: Expression[]
    
    constructor( private app: ApplicationContext, public moduleContext: ModuleContext<any>, public component: T) {

        this.descriptor = Component.descriptor(this.component)

        this.instance = new component()

        this.htmlTemplate = this.descriptor.template

        const { dom, expressions } = this.parseTemplate(this.htmlTemplate)

        this.dom = dom

        this.expressions = expressions
    }


    parseTemplate( htmlTemplate: string ) {

        const dom = document.createElement(this.descriptor.selector)

        const ast = parse(htmlTemplate)

        const stack = [ dom ]

        const expressions = [ ]

        walk( ast, {
            enter: (node) => {

                // console.log("Enter", node)
                
                const openElement = stack.at(-1)

                if ( node.type === 'Text' ) {
                    // const domNode = document.createTextNode(node.value);
                    // openElement.appendChild(domNode)

                    const blocks = this.findVariablesInText(node.value)
                    // console.log("Found", blocks)
                    for ( const block of blocks ) {
                        if ( block.type === "Text" ) {
                            const domNode = document.createTextNode(block.value);
                            openElement.appendChild(domNode)
                        }
                        if ( block.type === "Expression" ) {
                            const domNode = document.createTextNode("-?-");
                            openElement.appendChild(domNode)

                            const expression = new Expression( domNode, block.value )
                            expressions.push( expression )
                        }
                    }
                }
                else if ( node.type === 'Tag' ) {
                    
                    let element: HTMLElement

                    console.log(`Processing ${node.name}`)

                    /* get the module descriptor */
                    const moduleDescriptor: ModuleDescriptor = Reflect.getMetadata(
                        'ui:module:descriptor', 
                        this.moduleContext.moduleClass.prototype)
                    
                    console.log("Got module descriptor", moduleDescriptor)

                    if ( this.moduleContext.hasSelector(node.name) ) {
                        console.log("Has selector", node.name)

                        const componentModuleContext = this.moduleContext.getComponentForSelector(node.name)
                        const {component, moduleContext} = componentModuleContext 
                        // TODO: FIX THIS HERE

                        // const componentContext: ComponentContext = moduleDescriptor.getComponentForSelector(node.name)
                        // const {component, moduleContext} = componentContext 

                        // console.log()

                        element = this.mountComponent(moduleContext, component)
                    }
                    else if ( html5tags[node.name] ) {
                        element = document.createElement(node.name)
                    }
                    else {
                       throw new Error(`Unknown selector ${node.name}, do you need to declare ${node.name} in a module`)
                    }

                    for ( let attribute of node.attributes ) {
                        let name = attribute.name.value
                        let value = attribute.value.value
                        /* event binding attribute */
                        if ( name.startsWith("(") ) {
                            const isEventBinding = true;
                            if ( name.endsWith(")") !== true ) {
                                throw new SyntaxError(`Missing trailing parenthesis in ${name} near element<${node.open.value}>`)
                            }
                            name = name.substring(1,name.length - 1)
                            let method = value.substring(0,value.length - 2) // ()

                            if (name === 'click') {
                                element.addEventListener('click', mouseEvent => {
                                    this.instance[method].call(this.instance, mouseEvent) 
                                    this.updateDomWithExpressionValues()
                                } )
                            }
                        }

                        if ( (! name.startsWith('*')) && (! name.startsWith('[')) && (! name.startsWith('(')) ) {
                            element.setAttribute(name, value)
                        }
                    }

                    if ( node.name === 'a' ) {
                        const routerLink = node.attributes.find( a => a.name.value === 'routerLink' || a.name.value === '[routerLink]' )
                        if ( routerLink ) {
                            const href = routerLink.value.value
                            element.setAttribute('href', href)

                            element.addEventListener('click', (event) => {
                                event.preventDefault()           // dont allow browser to navigate
                                // HERE: this.app.router.navigate(href)   // use the application router instead
                            })
                        }

                    }

                    openElement.appendChild(element)
                    stack.push(element)
                }
            },
            leave: (node) => {
                // console.log("Leave", node)
                if ( node.type === 'Tag' ) stack.pop()
            }

        } )

        return { dom, expressions }
    }

    mountComponent( moduleContext:ModuleContext<any>, component:Class ) {
        const harness = new ComponentHarness( this.app, moduleContext, component)
        return harness.dom
    }

    updateDomWithExpressionValues() {
        for ( let expression of this.expressions ) {
            const { node, statement } = expression
            const value = this.instance[statement]
            node.textContent = value
        }
    }

    findVariablesInText( text: string ) {

        const blocks = []
        while ( text ) {
            const response = this.findVariableInText(text)
            blocks.push(...response.blocks)
            text = response.text
        }
        
        return blocks
    }

    findVariableInText( text: string ) {
        let index = text.indexOf("{")

        const blocks = []

        if ( text.charAt(index + 1) == "{" ) {

            let end = index

            /* text before the { is just text */
            const preExpressionBlock = { value: text.substring(0, end), type: "Text" }
            /* add it to the blocks */
            blocks.push(preExpressionBlock)
            /* remove it and the "{{" opener from the text to be processed */
            text = text.substring(end + 1 + 1)

            /* find the closing bracket */
            index = text.indexOf("}")
            end = index
            if ( index < 0 ) {
                throw new Error("Could not find closing }} brackets for variable expression "
                + `in template. Near: ${text}`)
            }
            if ( text.charAt(index + 1) !== "}" ) {
                throw new Error("Found stray } bracket in variable expression in template, " 
                + "are you missing double expression closing bracketss }} in your template? "
                + `Near: ${text}`)
            }
            let expression = text.substring(0, end)
            const expressionBlock = { value: expression.trim(), type: "Expression" }
            blocks.push(expressionBlock)

            text = text.substring(index + 1 + 1)
            // const remainingTextBlock = { value: remaningText, type: "Text" }
            // blocks.push(remainingTextBlock)
        }

        if ( blocks.length === 0 ) {
            const block = { value: text, type: "Text" }
            blocks.push(block)
            text = null
        }

        return { blocks, text };
    }




}

export class Expression {



    constructor( public node: Text, public statement: string ) {

    }

}