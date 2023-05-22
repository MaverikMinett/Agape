import { Serializer } from "./serializer"

export class DateSerializer implements Serializer {

    inflate(isoString: string) {
        return new Date(isoString)
    }

    deflate(date: Date) {
        return date ? date.toISOString() : date
    }
}
