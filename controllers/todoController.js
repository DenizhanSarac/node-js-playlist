const { urlencoded } = require('body-parser');
var bodyParser= require('body-parser');



var data=[{item: 'get Milk'}, {item: 'Walk Dog'},{item: 'kick some coding ass '}]
var urlencodedParser= bodyParser.urlencoded({extended: false});


module.exports = function(app){
    try {
        app.get('/todo', function(req, res){
            res.render('todo',{todos: data});
        });
    } catch (e) {
        return next(new MyCustomError('template failed:' + e.message))
        console.log( "Failed: "+e.message);
    }
    

    app.post('/todo', urlencodedParser, function(req,res){
        data.push(req.body); 
        res.json(data);
    });

    app.delete('/todo/:item', function(req,res){
        data=data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
}