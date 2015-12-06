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

		*/

		var promisesPresObj = {

			sayHello: function(){

				console.log("hello NodeJS meetup")

			},

			// Functions used to create a promise:

			// Constructs a representation of a value. The value must be provided at later point in time
			createPromise: function(){

				return {
					// A promise starts containing no value,
					value: null,
					// with a "pending" state, so it can be fulfilled later,
					state: "pending",
					// and it has no dependencies yet.
					dependencies: []
				};

			},

			//  puts a value in the promise, allowing the expressions that depend on the value to be computed.
			fulfil: function(promise, value){

				// We need to return a promise that will contain the value of
				// the expression, when we're able to compute the expression
				var result = this.createPromise();

				// If we can't execute the expression yet, put it in the list of
				// dependencies for the future value
				if (promise.state === "pending") {
					promise.dependencies.push(function(value) {
						// We're interested in the eventual value of the expression
						// so we can put that value in our result promise.
						depend(expression(value), function(newValue) {
							fulfil(result, newValue);
							// We return an empty promise because `depend` requires one promise
							return createPromise();
						})
					});

					// Otherwise just execute the expression, we've got the value
					// to plug in ready!
				} else {
					depend(expression(promise.value), function(newValue) {
						fulfil(result, newValue);
						// We return an empty promise because `depend` requires one promise
						return createPromise();
					})

				},

				// defines a dependency between the expression and the value of the promise. It returns a new promise for the result of the expression, so new expressions can depend on that value.
				depend: function(promise, expression){

				}

			};

			/*

			There’s one open question left to be answered: how do we actually run the code so the order follows from the dependencies we’ve described? If we’re not following JavaScript’s execution order, something else has to provide the execution order we want.

			*/

			promisesPresObj.sayHello()


		} );

	} )( jQuery, window, document );
