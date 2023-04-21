db = connect( 'mongodb://localhost/zed' );

db.events.drop()

const events = [
    { name: '29th Annual Event: Gourmet Gala' },
    { name: 'Tribal Symposium' },
    { name: 'Lazy Dog Fundraiser' }
]

db.events.insertMany(events)

