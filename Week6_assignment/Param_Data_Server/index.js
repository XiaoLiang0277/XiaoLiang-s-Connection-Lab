let express = require('express') ;
let app = express() ;

let shabiList = {
    "data" : [
        {
            name : "bangzi",
            info : "shabi No.1" 
        },
        {
            name : "sandaimu",
            info : "shabi No.2"
        },
        {
            name : "fengyange",
            info : "shabi No.3"
        }
    ]

    
}

app.get('/', (request, response)=>{
    response.send("Hello");
})

app.get('/shabiList', (request, response)=>{
    response.json(shabiList);
})
app.get('/shabiList/:shabi', (req,res)=> {
    console.log(req.params.shabi);
    let user_param = req.params.shabi ;
    let user_obj;
    for(let i = 0; i < shabiList.data.length; i++){
        //console.log(user_param);
        //console.log(shabiList.data[i].name);
        if(user_param == shabiList.data[i].name){
            user_obj = shabiList.data[i];
        }
    console.log(user_obj);
    res.send("thank you");

    }

})

app.listen(3000, ()=>{
    console.log("app is listening at localhost:3000") ;
})