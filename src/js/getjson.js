var fs = require('fs');
var Promise = require('es6-promise').Promise;
var obj;

// Callback Hell

function callbackHell(){

        fs.readFile('mylittlepony.json', 'utf8', function (err, data) {

                if (err) throw err;
                obj = JSON.parse(data);

                console.log("Object:", obj);

                fs.readFile('nintendo.json', 'utf8', function (err, data) {
                        if (err) throw err;
                        obj = JSON.parse(data);

                        console.log("Object:", obj);

                        fs.readFile('piano.json', 'utf8', function (err, data) {
                                if (err) throw err;
                                obj = JSON.parse(data);

                                console.log("Object:", obj);

                                fs.readFile('barbie.json', 'utf8', function (err, data) {
                                        if (err) throw err;
                                        obj = JSON.parse(data);

                                        console.log("Object:", obj);

                                        fs.readFile('beats.json', 'utf8', function (err, data) {
                                                if (err) throw err;
                                                obj = JSON.parse(data);

                                                console.log("Object:", obj);

                                                fs.readFile('books.json', 'utf8', function (err, data) {
                                                        if (err) throw err;
                                                        obj = JSON.parse(data);

                                                        console.log("Object:", obj);

                                                        fs.readFile('kitchen.json', 'utf8', function (err, data) {
                                                                if (err) throw err;
                                                                obj = JSON.parse(data);

                                                                console.log("Object:", obj);

                                                                fs.readFile('minions.json', 'utf8', function (err, data) {
                                                                        if (err) throw err;
                                                                        obj = JSON.parse(data);

                                                                        console.log("Object:", obj);

                                                                        fs.readFile('moreminions.json', 'utf8', function (err, data) {
                                                                                if (err) throw err;
                                                                                obj = JSON.parse(data);

                                                                                console.log("Object:", obj);

                                                                                fs.readFile('playdough.json', 'utf8', function (err, data) {
                                                                                        if (err) throw err;
                                                                                        obj = JSON.parse(data);

                                                                                        console.log("Object:", obj);

                                                                                        fs.readFile('teddy.json', 'utf8', function (err, data) {
                                                                                                if (err) throw err;
                                                                                                obj = JSON.parse(data);

                                                                                                console.log("Object:", obj);



                                                                                        });

                                                                                });

                                                                        });

                                                                });

                                                        });

                                                });

                                        });



                                });



                        });



                });


        });

};

// callbackHell();

// fs.readFile(file, enc, function (err, data) {});

// wrapped as a promise:

function readFilePromise(fileName) {

    return new Promise(function(resolve, reject) {

        fs.readFile(fileName, 'utf8', function(error, content) {

            if (error) reject(error)

            else resolve(content);

            console.log(fileName, content)

        })
    })
}


// Promisified call

readFilePromise("mylittlepony.json")
.then(readFilePromise("nintendo.json"))
.then(readFilePromise("piano.json"))
.then(readFilePromise("barbie.json"))
.then(readFilePromise("beats.json"))
.then(readFilePromise("blocks.json"))
.then(readFilePromise("books.json"))
.then(readFilePromise("kitchen.json"))
.then(readFilePromise("minions.json"))
.then(readFilePromise("moreminions.json"))
.then(readFilePromise("playdough.json"))
.then(readFilePromise("teddy.json"))
.catch(function(e) {

        console.log(e); // "oh, no!"

})

console.log("DONE");







/*
Promise.all([

        readFilePromise("nintendo.json"),
        readFilePromise("piano.json"),
        readFilePromise("barbie.json"),
        readFilePromise("beats.json"),
        readFilePromise("blocks.json"),
        readFilePromise("books.json"),
        readFilePromise("kitchen.json"),
        readFilePromise("minions.json"),
        readFilePromise("moreminions.json"),
        readFilePromise("playdough.json"),
        readFilePromise("teddy.json"),

]).then(function(data){
        console.log("This is everything: ", data)
}).catch(function(e) {

        console.log(e); // "oh, no!"

})
*/
