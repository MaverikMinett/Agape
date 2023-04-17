import { describe, it } from "@lib/demo"

describe('colors', 'interactive', () => {
    it('no libs', async () => {
    // standard 16 colors
    console.log("\x1b[31m" + "Required" + "\x1b[0m")

    // 255 extended color palette
    console.log("\x1b[38;5;244m" + "Required" + "\x1b[0m")
    console.log("\x1b[38;5;135m" + "Required" + "\x1b[0m")
    // ESC[38:5:⟨n⟩m Select foreground color      where n is a number from the table below
    // ESC[48:5:⟨n⟩m Select background color

    // full color palette with rgb color
    console.log("\x1b[38;2;81;134;219m" + "Required" + "\x1b[0m")
    console.log("\x1b[38;2;98;155;234m" + "Required" + "\x1b[0m")
    })
})
