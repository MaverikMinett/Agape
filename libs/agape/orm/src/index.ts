export * from './lib/orm'
export * from './lib/connections/mongo.connection'
export * from './lib/databases/mongo.database'
export * from './lib/decorators/entity'

import { Orm } from './lib/orm'
export const orm = new Orm()
export default orm
