# Agape Express

Utilities for express applications

## Synopsis

```
const app: Application = express();

/* logging */
app.use( log )

/* proxy */
app.use(['/ng', '/ng/*'], proxy('http://localhost:4200') )
```

## Middleware

`log`

Log incoming http requests

`proxy( url )`

Proxy a route another server

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
