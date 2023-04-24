console.log('Hello World');



import axios from 'axios';

import Benchmark from 'benchmark'

var suite = new Benchmark.Suite;

suite.add('nothing', async function() {
    
})



suite.add( 'Nest.JS', {
    defer: true,
    fn: deferred => {
        axios.get('http://localhost:3003/api/events')
            .then( () => deferred.resolve() )

    }
})
suite.add( 'Express with Libs', {
    defer: true,
    fn: deferred => {
        axios.get('http://localhost:3000/api/events')
            .then( () => deferred.resolve() )

    }
})

suite.add( 'Express No Libs', {
    defer: true,
    fn: deferred => {
        axios.get('http://localhost:3005/api/events')
            .then( () => deferred.resolve() )

    }
})


suite.on('cycle', function(event) {
    console.log( String(event.target) );
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  
  .run({ 'async': true });




