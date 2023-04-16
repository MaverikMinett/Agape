import { TestCase } from "./test-case"
import { TestSuite } from "./test-suite"


export class TestRunner {

    constructor( ) {
        
    }

    async run( suite: TestSuite ) {

        await suite.run();
 
    }
}

