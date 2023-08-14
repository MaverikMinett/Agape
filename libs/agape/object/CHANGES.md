2.0.1
- add classExtends utility method

2.0.0
- move types into @agape/types package
- added dispatchers, ephemeral and shadow decorators

1.4.1 Jun 11, 2022
- changed Δapply to Δinclude

1.4.0 May 12, 2022
- added support for both es2015/es2020
- Δapply method on traits
- added transient methods

1.3.0 Aug 29, 2021
- traits can now over-ride the constructor of the consuming class by decorating the class using the Δdecorate property
- added unveil function
- added tests for deflate

1.2.1 June 26, 2021
- inflate will now accept a customer serializer in place of class (original behavior still functions as before)

1.2.0 Jun 25, 2021
- added ability to use custom serializer with @coerce decorator

1.1.2 Jun 25, 2021
- bug fix: inflate was replacing all properties on an object with the Agape property dispatcher,
           this has been fixed so that regular properties remain as regular properties

1.1.1  Jun 9, 2021
- added documentation for Class and Dictionary types

1.1.0  Jun 9, 2021
- added @coerce decorator
- added inflate method
- added Class and Dictionary types

1.0.4  Jun 3, 2021
- bug fix: dynamically defined methods are now writable to allow spys to be installed
- bug fix: methods imported into a class via a trait now copy all native js property
           descriptor options, effectively allowing spys to be installed

1.0.3  Feb 19, 2021
- bug fix: return undefined retrieving inherited property from non-existent object

1.0.2  Feb 2, 2021
- updates to documentation

1.0.1  Dec 28, 2020
- @lazy can now be called without arguments
- added @build decorator
- added deflate function
- building as cjs/esm for distribution

0.1.3
- initial


