import { Class } from "@agape/types";
import { Component } from "./decorators";
import { ComponentDescriptor } from "./descriptors";

import { parse, walk, SyntaxKind } from 'html5parser';


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
    
    constructor(public component: T) {

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

                console.log("Enter", node)
                
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
                    
                    const element = document.createElement(node.name)

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

                    openElement.appendChild(element)
                    stack.push(element)
                }
            },
            leave: (node) => {
                console.log("Leave", node)
                if ( node.type === 'Tag' ) stack.pop()
            }

        } )

        return { dom, expressions }
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