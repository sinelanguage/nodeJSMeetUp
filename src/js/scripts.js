

( function ( $, window, document, undefined ) {

	'use strict';

	$( function () {

		// demo

		var el = document.getElementsByClassName( 'myClassName' );

		function addClass( el, className ) {

			el[ 0 ].classList.add( className );

		};

		function removeClass( el, className ) {

			el[ 0 ].classList.remove( className )

		};

		/*

		This presentation makes the following assumptions:
		Developers are at least familliar with:

		the concept and useage of

		a) higher-order functions
		b) closures
		c) callbacks (continuation-passing style)

		All terminology is assumed to be in the context of JavaScript and/or NodeJS.

		Q: What is a promise?

		A:
		Promises are a programming concept

		A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its then method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

		In JavaScript they are a specification (a set of guidelines your code should to follow when using/implimenting the concept)

		In code, they exist and are used in a few ways.

		1) Promise API in ES6
		2) Promise Libraires such as (Q) and Bluebird

		In these implimentations, at their core they give developers a “promise” as an object or function with a then method whose behavior conforms to this specification

		This object can be thought of as a placeholder into which the successful resulting value or reason for failure will materialize.





		Q: Why promise's exist in modern JavaScript
		A:

		They are there to help manage complexity in the order of execution of our functions in our apps.

		If we don’t have any order at all, how can we compose values coming from other expressions? Well, we can’t, since there’s no guarantee that the value would have been computed by the time we need it.

		Q: How can promises be used in NodeJS ?  ( Is it a design pattern? A small library? A Node Package ? )
		A:

		*/


		fs.readFile(path, function(error, content) {

			// handle error or do something with content
			if (error){

				// handleError

			} else {

				//handleContent

			}
		})

		// becomes this:

		fs.readFileAsync(path).done(function(content) {

			// do something with content

		}, function(error) {

			// handle error

		});

		/*

		Whats going on here?

		fs.readFileAsync(file) starts a file reading operation. That operation is not yet complete at the point when readFile returns. This means we can't return the file content.

		But we can still return something: we can return the reading operation itself. And that operation is represented by a promise.

		Callbacks VS Promises

		*/

		// Callback based FN
		function readMyFile(callback) {
		    fs.readFile('myfile.txt', callback);
		}

		// Promise based FN
		function readMyFile() {
		    return fs.readFileAsync('myfile.txt');
		}

		// what if you need to do more processing with the result?  Use a "then" method.

		// But what if we wanted to do additional processing? What if we want to read a single line of a file? Then we'll need to add some code to split the file into lines and get the specified line. Let's see how we can do that.

		/*

		Callbacks

		To do this with callbacks, we'll pass our custom callback that does the splitting.

		The callback bails-out if there was an error reading the file, otherwise proceeds to split the content and call the original callback with the line content:

		*/

		function readLine(file, line, callback) {
		    fs.readFile(file, function process(err, content) {
		        if (err) return callback(err);
		        callback(null, content.toString().split('\n')[line]);
		    });
		}
		readLine('myfile.txt', 2, function(err, line) {
		    // handle error or use line
		});


		Promise Based

		/*
		Library (minified)  | Size*  | Implementation | Native | Client        | Server
		---------------------------------------------------------------------------------
		native (ES6)        | 0      | Promises/A+    | Yes    | Yes           | Yes
		Q                   | 2.5    | Promises/A+    | No     | Yes           | Yes
		Bluebird            | 68.4   | Promises/A+    | No     | Bfy/global   | CommonJS
		when                | ?      | Promises/A+    | No     | Yes           | CommonJS
		then/promise*       | 4.8    | Promises/A+    | No     | Browserify    | Yes

		*/

		function sayHello(){

			console.log("Hello NodeJSMeetUp")

		};

		/*

		Basic Promise Usage
		The new Promise() constructor should only be used for legacy async tasks, like usage of setTimeout or XMLHttpRequest. A new Promise is created with the new keyword and the promise provides resolve and reject functions to the provided callback:

		*/

		var myFirstPromise = new Promise( function(resolve, reject) {

			// Do an assync task async task and then...

			if( myGoodCondition ) { // good condition
				resolve('Success!');
			}
			else {
				reject('Failure!');
			}
		} );

		myFirstPromise.then(function() {
			// do something with result
		}).catch(function() {
			// error
		})

		// Callback Hell

		function asyncTask(fn) {


			/*

			takes in a function as the parameter
			waits 2 seconds, and invokes that function it took in

			*/

			return setTimeout( function(){ fn(); }, 2000 );

		}

		function foo(n, newFn) {

			/*

			n: value that this fn will pass into the async function it contains.
			fn: a function that the async function will invoke passing in the value the parent function took in

			*/


			asyncTask( function(resValue){ newFn(n); } );


		}
		function bar(n, anotherNewFn) {

			asyncTask( function(resValue){ anotherNewFn(n); } );

		}
		function baz(n, yetAnotherFFnFn) {

			asyncTask( function(resValue){ yetAnotherFFnFn(n); } );

		}

		// define n
		var n = 1;

		foo(n, function(res) { // foo takes in n=1 and this anonymous function that it will pass into async, which makes us wait 2 seconds before moving onto the next nested step

			bar(res+1, function(res) { // bar takes in n=1 + 1, so now  2, and this anonymous function that it will pass into async, which makes us wait an additional 2 seconds before doing anything else

				baz(res+1, function(res) {

					// bar takes in n=1 + 1, so 2, and this anonymous function that it will pass into async, which makes us wait an additional 2 seconds and then calls this anonymous function which simply logs what was passed down the steps into it.
					console.log("result =", res);

				});

			});

		});

		// 6 seconds pass...
		// result = 3

		// Continuation-passing style

		function foo2() { // foo simply calls the bar function, in which bar takes the anonymous function passed into it

			bar2(function (res) {
				console.log("result = " + res);
			});

		};

		function bar2(fn) {  // bar passes the previously declared anonymous fn into baz, because bar is defined as a function that simply calls baz and passes its anonymous function parameter into it.

			baz2(fn);

		};

		function baz2(fn) { // and baz calls that function that's been passed on sequentially

		fn(3);
	}

	foo2(); // and calling the originator of this whole scheme get's the ball rolling.



} );

} )( jQuery, window, document );
