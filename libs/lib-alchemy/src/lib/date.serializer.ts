import { Serializer } from "@agape/object"

export class DateSerializer extends Serializer {

    inflate(isoString: string) {
        return new Date(isoString)
    }

    deflate(date: Date) {
        return date ? date.toISOString() : date
    }
}
