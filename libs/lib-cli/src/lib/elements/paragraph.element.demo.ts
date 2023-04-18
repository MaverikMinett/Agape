import { CliParagraphElement } from "@lib/cli"
import { describe, it } from "@lib/demo"

describe('CliParagraphElement', 'interactive', () => {
    it('should run', async () => {
        const lorum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
        mollit anim id est laborum.`
   
       const e = new CliParagraphElement( lorum )
       await e.run()
    })
})
