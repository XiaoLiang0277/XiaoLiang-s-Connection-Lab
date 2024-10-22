window.addEventListener('load',()=>{
    document.getElementById('button-coffee'),addEventListener('click',()=>{
        let noCups = document.getElementById('number-coffee').value;
        console.log(noCups);
        let obj={"number": noCups};
        let jsonData = JSON.stringify(obj);

        fetch('/noCups',{
            method:'POST',
            headers:{
                "Content-type": "application/json"
            },
            body:jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

        
    })
    document.getElementById('get-tracker').addEventListener('click',()=>{
        fetch('/getCups')
        .then(resp=>resp.json())
        .then(data=>{
            document.getElementById('coffee-info').innerHTML = '';
            console.log(data.data);
            for(let i=0;i<data.data.length;i++){
                let string = data.data[i].date + ":" + data.data[i].coffee;
                let elt = document.createElement('p');
                document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('coffee-info').appendChild(elt);
            }
        })
    })
})