import { ObjectId } from "mongodb"
import { MongoDocument } from "../types"



export function documentFrom<T extends {id: string}>( input: T ) {
    const doc: any = input    // easier with an any here
    doc._id = new ObjectId(input.id)
    delete doc.id
    return doc as MongoDocument<T>
}