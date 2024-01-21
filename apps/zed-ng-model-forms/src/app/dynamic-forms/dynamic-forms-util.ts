import { labelize } from "@agape/string"

export function enumToChoices( set: any ) {
    const options = Object.entries(set).map( ([key, value]) => {
        const label = labelize(key)
        return { label, value }
    })
    return options
}


