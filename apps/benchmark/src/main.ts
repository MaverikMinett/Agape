console.log('Hello World');



import axios from 'axios';

import Benchmark from 'benchmark'

var suite = new Benchmark.Suite;

// suite.add('console.log', async function() {
//     console.log("This right here")
// })

suite.add( 'Express with Libs', {
    defer: true,
    fn: deferred => {
        axios.get('http://localhost:3000/api/events')
            .then( () => deferred.resolve() )

    }
})

// suite.add( 'Express No Libs', {
//     defer: true,
//     fn: deferred => {
//         axios.get('http://localhost:3001/api/events')
//             .then( () => deferred.resolve() )

//     }
// })

suite.add( 'Nest.JS', {
    defer: true,
    fn: deferred => {
        axios.get('http://localhost:3003/api/events')
            .then( () => deferred.resolve() )

    }
})


// suite.add('foo', {
//     defer: true,
//     fn: function (deferred) {
//       setTimeout(function() {
//         deferred.resolve();
//       }, 200);
//     }
//   }).on('complete', function () {
//     console.log(this[0].stats)
//   }).run()

// suite.add('buildable', async function() {
//     const a = await axios.get('http://localhost:3000/api/events')
// })


suite.on('cycle', function(event) {
    console.log( String(event.target) );
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  
  .run({ 'async': true });


// async function main() {
//     const response = await axios.get('http://localhost:3000/api/events')
//     console.log(response)
// }

// main();



