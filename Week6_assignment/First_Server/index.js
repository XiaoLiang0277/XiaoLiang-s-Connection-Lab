let express = require('express') ;
let app = express() ;

app.get('/', (request, response)=>{
    response.send("Hello");
})

app.get('/bangzishabi', (request, response)=>{
    response.send("This is an about page. But bangzi is shabi.");
})

app.listen(3000, ()=>{
    console.log("app is listening at localhost:3000") ;
})
