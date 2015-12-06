

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
		A: Promises are representations of eventual values.  Not the value's themselves.

		A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its then method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

		It is a placeholder into which the successful resulting value or reason for failure will materialize.

		Q: Why promise's exist in modern JavaScript
		A: They are there to help manage complexity in the order of execution of our functions in our apps.

		Further thought:
		If we don’t have any order at all, how can we compose values coming from other expressions? Well, we can’t, since there’s no guarantee that the value would have been computed by the time we need it.

		One way to do this is by introducing this concept of dependencies on top of promises.

		This new formulation of promises consists of two major components: Something that makes representations of values, and can put values in this representation. And something that creates a dependency between one expression and a value, creating a new promise for the result of the expression.


		Q: How are promises represented in code?  (Is it a design pattern? A small library?  A Node Package?)
		A:

		Q: How do promises help you in your NodeJS Apps?
		A:


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

			if(/* good condition */) {
				resolve('Success!');
			}
			else {
				reject('Failure!');
			}
		} );

		myFirstPromise.then(function() {
			/* do something with the result */
		}).catch(function() {
			/* error :( */
		})

		// Callback Hell

		function asyncTask(fn) {


			/*

			takes in a function as the parameter
			waits 2 seconds, and invokes that function it took in

			*/

			return setTimeout( function(){ fn(); }, 2000 );

		}

		function foo(n, fn) {

			/*

			n: value that this fn will pass into the async function it contains.
			fn: a function that the async function will invoke passing in the value the parent function took in

			*/


			asyncTask( function(val){ fn(n); });


		}
		function bar(n, fn) {

			asyncTask(function(val){ fn(n); });

		}
		function baz(n, fn) {

			asyncTask(function(val){ fn(n); });

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

		function foo() { // foo simply calls the bar function, in which bar takes the anonymous function passed into it

			bar(function (res) {
				console.log("result = " + res);
			});

		};

		function bar(fn) {  // bar passes the previously declared anonymous fn into baz, because bar is defined as a function that simply calls baz and passes its anonymous function parameter into it.

			baz(fn);

		};

		function baz(fn) { // and baz calls that function that's been passed on sequentially

			fn(3);
		}

		foo(); // and calling the originator of this whole scheme get's the ball rolling.



	} );

} )( jQuery, window, document );
