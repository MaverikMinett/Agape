# Agape Exception

Errors with status codes

## Synopsis

```

import { Exception } from '@agape/exception'

throw new Exception(404)

throw new Exception(404, "Could not find record with id " + id)

throw new Exception("Something bad happened")

throw new Exception(400, "Something bad happened")

```

## Class

`Exception`

### Properties

`status`

Number that corresponds with HTTP Error Codes

`statusText` 

Accompanying text for the status code

`message`

A user friendly error message

## The Constructor

The constructor in it's various forms is built to *do what I mean*;
accepting either a `status` code, a `message`, or both as parameters.
The three argument form allows setting a custom `statusText`.

Setting just the `status` code results in an exception where the `message`
and `statusText` are populated automatically.

```
const e = new Exception(500)
e.status      /* 500 */
e.statusText  /* Internal Server Error */
e.message     /* Internal Server Error */ 
```

Setting just the `message` results in a `400 Bad Request` error.

```
const e = new Exception("Invalid data")
e.status      /* 400 */
e.statusText  /* Bad Request */
e.message     /* Invalid data */ 
```

The `statusText` can be set in the three argument form.

```
const e = new Exception(404, "Silly Not Found", "Oops, couldn't find that")
e.status      /* 404 */
e.statusText  /* Silly Not Found */
e.message     /* Oops, couldn't find that */ 
```

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
