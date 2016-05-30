var Todo = require('./models/todo');
var redicConf = require('../config/redis');            // load the redis config
var redis = require('redis');                                                                                                                                                                                                                      
var client = redis.createClient(redicConf.redisPort, redicConf.redisIP);          //create redis client 

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get number of hits
    app.get('/api/hits', function (req, res) {
        // get the number of hits from Redis
        client.get("hits", function(err, reply) {
            var hits = { number: reply }
            res.json(hits);
        });
    });

    // get all todos
    app.get('/api/todos', function (req, res) {
        // increment the number of hits in Redis
        client.incr('hits');
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        //FIX - remove lines 43-46
        Todo.create({
            text: req.body.text,
            done: false
        });

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};