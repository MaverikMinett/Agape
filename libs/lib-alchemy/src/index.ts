export * from './lib/alchemy'
export * from './lib/date.serializer'

import { Alchemy } from './lib/alchemy'
import { DateSerializer } from './lib/date.serializer';

const alchemy = new Alchemy();
alchemy.register( Date, new DateSerializer() )

export { alchemy }
export default alchemy