db = connect( 'mongodb://localhost/zed' );

db.events.drop()

const events = [
    { name: '29th Annual Event: Gourmet Gala' },
    { name: 'Tribal Symposium' },
    { name: 'Lazy Dog Fundraiser' }
]

db.events.insertMany(events)

const users = [
    { name: 'Foo', username: 'foo', password: 'password' },
    { name: 'Bar', username: 'bar', password: 'password' },
    { name: 'Baz', username: 'baz', password: 'password' }
]

db.users.insertMany(users)
