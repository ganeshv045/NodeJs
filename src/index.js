//We are using common js

const express = require('express');
const bodyParser = require('body-parser');

// WHen we call the function express we create a new express server object

const app = express(); // internally express uses http module and creates http server

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

function middleware1(req, res, next){
    console.log("Inside middleware 1");
    req.user = "Ganesh"
    next();
    // Here instead of calling next() can we call middleware2(), if you do this you need to pass req and res object manuaally
    // middleware2(req, res)
    console.log("After middleware 1");
}

function middleware2(req, res, next){
    // console.log("Inside middleware 2", req);
    req.user2 = "Chethu"
    next();
    console.log("After middleware 2");
    
}

app.get('/home', middleware1, middleware2,(req, res)=>{ // you can keep middle ware functions in an array.
    console.log("/home route called");
    // console.log("fincal Req = ", req);
    console.log("Queryparam = ", req.query);
    
    return res.json({message:"OK"}); // We are passing JS object and internally it convertas to json
});

app.post('/products/:id/rating/:rate', (req, res)=>{
    const id = req.params.id;
    return res.json({productId: id, rating: req.params.rate})
})

app.post('/data', (req, res)=>{
    console.log("body", req.body); // prints udefined for resolving this we need to use middleware i.e body parser

    //Body parser will automaticaly convers the req body to JS understandable
    //If body is json then it converts to JS object
    //If it is text thne converts to string
    
    return res.json({message: "OK"});
})

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})
