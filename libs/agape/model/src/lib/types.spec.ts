import { Document } from './document'
import { Flatten } from './types';

class ADocument extends Document { }

class NotADocument { }

class AClass extends Document {

    number: number

    string: string

    date: Date

    boolean: boolean

    array: Array<any>

    arrayOfNumbers: Array<number>

    arrayOfStrings: Array<string>

    arrayOfBooleans: Array<boolean>

    arrayOfArrays: Array<Array<number>>

    document: ADocument

    notADocument: NotADocument

    arrayOfDocument: Document[]

    arrayOfNotDocuments: NotADocument[]

    map: Map<string, string>

    mapOfDocuments: Map<string, ADocument>

    mapOfNonDocuments: Map<string, NotADocument>

    set: Set<string>

    setOfDocuments: Set<ADocument>

    setOfNonDocuments: Set<NotADocument>
}



describe('Model Types', () => {
    xit('See spec file to verify in IDE', () => {

        let a: AClass = new AClass()
        let x: Flatten<AClass>
        console.log( x.number )                 /** number **/
        console.log( x.string )                 /** string **/
        console.log( x.date )                   /** number **/
        console.log( x.boolean )                /** boolean **/
        console.log( x.array )                  /** any[] ? **/
        console.log( x.arrayOfNumbers )         /** number[] **/
        console.log( x.arrayOfStrings )         /** string[] **/
        console.log( x.arrayOfBooleans )        /** boolean[] **/
        console.log( x.arrayOfArrays )          /** number[][] **/
        console.log( x.document )               /** string[] **/
        console.log( x.notADocument )            /** {} (POJO) **/
        console.log( x.arrayOfDocument )        /** string[] **/
        console.log( x.arrayOfNotDocuments )     /** {}[] (Array of POJOS) **/
        console.log( x.map )                    /** Record<string, string> **/
        console.log( x.mapOfDocuments)           /** Record<string, string> **/
        console.log( x.mapOfNonDocuments )       /** Record<string, {}> **/
        console.log( x.set )                    /** string[] **/
        console.log( x.setOfDocuments )          /** string[] **/
        console.log( x.setOfNonDocuments )       /** string[] **/

        let r: Flatten<string>                  /** string[] **/

        let s: Flatten<number>                  /** number **/

        let t: Flatten<Date>                    /** string[] **/

        let u: Flatten<Array<string>>           /** string[] **/

        let v: Flatten<Set<string>>             /** string[] **/

        let w: Flatten<Map<string,string>>      /** Record<string,string> **/

    })
})
