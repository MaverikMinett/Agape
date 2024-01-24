import { Choice } from "@agape/model"
import { labelize } from "@agape/string"

export function enumToChoices( set: any ): Choice[] {
    const options = Object.entries(set).map( ([key, value]:[string,any]) => {
        const label = labelize(key)
        return { label, value }
    })
    return options
}


