

( function ( $, window, document, undefined ) {

	'use strict';

	$( function () {

		// demo

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

		Promises are a programming concept.

		A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its then method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

		In JavaScript there is a Promise Specification a specification (a set of guidelines your code should to follow when using/implimenting the concept)

		In code, they exist and are used in a few ways.

		1) Promise API in ES6
		2) Promise Libraires such as (Q) and Bluebird

		In these implimentations, at their core they give developers use of a “promise” object or function with a then method whose behavior conforms to the Promise Specification

		In NodeJS Promises are objects that have a then method. Unlike node functions, which take a single callback, the then method of a promise can take two callbacks: a success callback and an error callback.

		This promise object can be thought of as a placeholder into which the successful resulting value or reason for failure will materialize.

		Then what?

		Functions can now return a value, called a 'promise', which is the object that represents the eventual results of that operation.

		Different Promise Based Libraries

		Library (minified)  | Size*  | Implementation | Native | Client        | Server
		---------------------------------------------------------------------------------
		native (ES6)        | 0      | Promises/A+    | Yes    | Yes           | Yes
		Q                   | 2.5    | Promises/A+    | No     | Yes           | Yes
		Bluebird            | 68.4   | Promises/A+    | No     | Bfy/global   | CommonJS
		when                | ?      | Promises/A+    | No     | Yes           | CommonJS
		then/promise*       | 4.8    | Promises/A+    | No     | Browserify    | Yes


		I've been told Bluebird is faster than even the native ES6 Promise spec.  Angular has adopted the Q Library.  Node has several ways to deal with asynchronous operations, Promises are just one solution.  We have streams, generators, and several modules such as "async" which do things slightly different


		Q: Why promise's exist in modern JavaScript

		A:

		They are there to help manage complexity in the order of execution of our functions in our apps.

		If we don’t have any order at all, how can we compose values coming from other expressions? Well, we can’t, since there’s no guarantee that the value would have been computed by the time we need it.

		Q: How can promises be used in NodeJS ?
		A:

		*/

		// Basic Callback FN:

		getTweetsFor("domenic", function (err, results) {
			// the rest of your code goes here.
		});

		// Basic Promise:
		// again your functions return a value, called a promise, which represents the eventual results of that operation.

		var promiseForTweets = getTweetsFor("domenic");

		getTweetsFor("domenic") // promise-returning function
		.then(function (tweets) {
			var shortUrls = parseTweetsForUrls(tweets);
			var mostRecentShortUrl = shortUrls[0];
			return expandUrlUsingTwitterApi(mostRecentShortUrl); // promise-returning function
		})
		.then(httpGet) // promise-returning function
		.then(
			function (responseBody) {
				console.log("Most recent link text:", responseBody);
			},
			function (error) {
				console.error("Error with the twitterverse:", error);
			}
		);

		/*

		Syncronous Functions serve
		They return values
		They throw exceptions

		Now, in an asynchronous world, you can no longer return values: they simply aren’t ready in time. Similarly, you can’t throw exceptions, because nobody’s there to catch them. So we descend into the so-called “callback hell,” where composition of return values involves nested callbacks, and composition of errors involves passing them up the chain manually

		The point of promises is to give us back functional composition and error bubbling in the async world. They do this by saying that your functions should return a promise, which can do one of two things:

		Become fulfilled by a value
		Become rejected with an exception

		'then' is not a mechanism for attaching callbacks to an aggregate collection. It’s a mechanism for applying a transformation to a promise, and yielding a new promise from that transformation.

		*/

		// Now, in an asynchronous world, you can no longer return values: they simply aren’t ready in time

		// Basic Callback Hell:

		step1(function (value1) {
			step2(value1, function(value2) {
				step3(value2, function(value3) {
					step4(value3, function(value4) {
						// Do something with value4
					});
				});
			});
		});


		MyPromiseSpecBasedFn(promisedStep1)
		.then(promisedStep2)
		.then(promisedStep3)
		.then(promisedStep4)
		.then(function (value4) {
			// Do something with value4
		})
		.catch(function (error) {
			// Handle any error from all above steps
		})
		.done();


		// in NodeJS

		fs.readFile(file, function(err, res) {
			if (err) handleError();
			doStuffWith(res);
		});

		// With bluebirds promisify method

		fs.readFile(file).then(function(res) {
			doStuffWith(res);
		}, function(err) {
			handleError();
		});

		/*

		So far, this doesn't look that different from regular node callbacks - except that you use a second callback for the error (which isn't necessarily better). So when does it get better?

		Its better because you can attach the callback later if you want. Remember, fs.readFile(file) returns a promise now, so you can put that in a var, or return it from a function:

		*/

		var filePromise = fs.readFile(file);
		// do more stuff... even nest inside another promise, then
		filePromise.then(function(res) { ... });

		/*

		Yup, the second callback is optional. We're going to see why later.

		Okay, that's still not much of an improvement. How about this then? You can attach more than one callback to a promise if you like:


		*/


		filePromise.then(function(res) { uploadData(url, res); });
		filePromise.then(function(res) { saveLocal(url, res); });


		/*

		if you return something from inside a .then() callback, then you'll get a promise for that thing on the outside?
		Say you want to get a line from a file. Well, you can get a promise for that line instead:

		*/


		var filePromise = fs.readFile(file)

		var linePromise = filePromise.then(function(data) {
			return data.toString().split('\n')[line];
		});

		var beginsWithHelloPromise = linePromise.then(function(line) {
			return /^hello/.test(line);
		});

		// this
		fs.readFile("file.json", function (err, val) {
			if (err) {
				console.error("unable to read file");
			}
			else {
				try {
					val = JSON.parse(val);
					console.log(val.success);
				}
				catch (e) {
					console.error("invalid json in file");
				}
			}
		});

		// becomes this:

		fs.readFileAsync("file.json").then(JSON.parse).then(function (val) {
			console.log(val.success);
		})
		.catch(SyntaxError, function (e) {
			console.error("invalid json in file");
		})
		.catch(function (e) {
			console.error("unable to read file");
		});

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

	// Examples of Promises/A forwarding.

	// A few simple examples to show how the mechanics of Promises/A
	// forwarding works.
	// These examples are contrived, of course, and in real usage, promise
	// chains will typically be spread across several function calls, or
	// even several levels of your application architecture.

	var d;

	d = when.defer();

	// Resolved promises chain and forward values to next promise
	// The first promise, d.promise, will resolve with the value passed
	// to d.resolve() below.
	// Each call to .then() returns a new promise that will resolve
	// with the return value of the previous handler.  This creates a
	// promise "pipeline".
	d.promise
	.then(function(x) {
		// x will be the value passed to d.resolve() below
		// and returns a *new promise* for x + 1
		return x + 1;
	})
	.then(function(x) {
		// x === 2
		// This handler receives the return value of the
		// previous handler.
		return x + 1;
	})
	.then(function(x) {
		// x === 3
		// This handler receives the return value of the
		// previous handler.
		return x + 1;
	})
	.then(function(x) {
		// x === 4
		// This handler receives the return value of the
		// previous handler.
		log('resolve ' + x);
	});

	d.resolve(1);

	// Rejected promises behave similarly, and also work similarly
	// to try/catch:
	// When you catch an exception, you must rethrow for it to propagate.
	// Similarly, when you handle a rejected promise, to propagate the
	// rejection, "rethrow" it by either returning a rejected promise,
	// or actually throwing (since when.js translates thrown exceptions
	// into rejections)
	d = when.defer();

	d.promise
	.then(function(x) {
		throw x + 1;
	})
	.then(null, function(x) {
		// Propagate the rejection
		throw x + 1;
	})
	.then(null, function(x) {
		// Can also propagate by returning another rejection
		return when.reject(x + 1);
	})
	.then(null, function(x) {
		log('reject ' + x); // 4
	});

	d.resolve(1);

	// Just like try/catch, you can choose to propagate or not.  Mixing
	// resolutions and rejections will still forward handler results
	// in a predictable way.
	d = when.defer();

	d.promise
	.then(function(x) {
		return x + 1;
	})
	.then(function(x) {
		throw x + 1;
	})
	.then(null, function(x) {
		// Handle the rejection, and don't propagate.  This is like
		// catch without a rethrow
		return x + 1;
	})
	.then(function(x) {
		log('mixed ' + x); // 4
	});

	d.resolve(1);

	function log(msg) {
		var p = document.createElement('p');
		p.innerHTML = msg;
		document.body.appendChild(p);
	}



} );

} )( jQuery, window, document );
