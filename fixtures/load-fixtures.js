db = connect( 'mongodb://localhost/zed' );

db.events.drop()

const events = [
    { 
        name: '29th Annual Event: Gourmet Gala',
        timeStart: new Date("2021-10-23 17:00:00"),
        timeEnd: new Date("2021-10-23 21:00:00"),
        locationName: "Some Fancy Place",
        locationAddress: "Winners Circle, Town Heights",
        contactPhone: "(555) 555-5555",
        contactEmail: "kathy@geemail.com",
        description: `<p>This promises to be a great event with good food for a
        good cause! Be sure to save the date and click the link below to register
         for the event. We hope to see you there!</p> <p>Even if you can’t make it 
         to the event, please consider donating in support of this worthy cause!</p>`
    },
    { 
        name: 'Tribal Symposium' ,
        timeStart: new Date("2021-10-14 08:00:00"),
        timeEnd: new Date("2021-10-17 20:00:00"),

        description: `
          <p>Join us on the tropical island of Ustupu, Guna Yala during the annual celebration of the Nele Kantule festival
          . Four tribes from 3 countries will be assembling for an inter-tribal education exchange as part
          of our Tribal Symposium taking place during the festival.</p>

          <p>
            <b>Nele Kantule</b>
            <br/>
            Nele Kantule is the warrior chief that lead the Guna warriors to victory against the Panamanian government in 1925.
            With this victory, the Guna Yala is recognized as an independant and autonomous indigienous nation within the borders
            of the Panamanian territory.
          </p>

          <p>
            <b>Directions</b>
            <ul>
              <li>Boat: You can catch a lancha at the docks in Miramar, total travel time in boat is 10 hours and costs ~$100.</li>
              <li>Plane: Take a bi-plane from panama city to the Island of Gaigirgordub and take a water taxi to Ustupu.</li>
            </ul>
          </p>
        `,
        locationName: "Some Remote Place",
        locationAddress: "The Carribean, Central America",
        contactPhone: "(555) 555-5555",
        contactEmail: "tribalsymposium@geemail.com",
    },
    { 
        name: 'Lazy Dog Fundraiser',

        timeStart: new Date("2021-11-10 16:00:00"),
        timeEnd: new Date("2021-11-10 20:00:00"),
        locationName: "The Lazy Dog",
        locationAddress: "123 Main St, Anytown",
        contactPhone: "555 555 5555",
        contactEmail: "thelazydog@geemail.com",
        description: `<img src="http://i.ibb.co/vjbz1Pc/HSVC-Flier-lazydog.jpg"><br/>Humane Society of Ventura County. This event has no tickets or sessions.`,
     }
]

db.events.insertMany(events)

const users = [
    { name: 'Foo', username: 'foo', password: 'password' },
    { name: 'Bar', username: 'bar', password: 'password' },
    { name: 'Baz', username: 'baz', password: 'password' }
]

db.users.insertMany(users)


const organizations = [
    { code: 'ACME'   , name: 'Acme Event Management' },
    { name: 'BLUTHE' , name: 'Bluthe Events' },
    { name: 'CHARITY', name: 'Charity Event Company' }
]

db.organizations.insertMany(organizations)

