
import { runtests } from '@lib/demo'


import './demos/sanity.demo'
import './demos/keypress.demo'
import './demos/terminal.demo'
import './demos/cursor.demo'


import './demos/demo.demo'
import './demos/any-key-to-continue.demo'
import './demos/banner.component.demo'
import './demos/cli.demo'
import './demos/vanilla-js-menu.demo'
import './demos/menu.control.demo'
import './demos/menu.component.demo'
import './demos/nav-menu.component.demo'
import './demos/paragraph.element.demo'
import './demos/vanilla-js-input.demo'
import './demos/colors.demo'


async function testMain() {
    console.log("Starting main")
    await runtests()
}

testMain()
