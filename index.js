const fs = require('fs');


const express = require("express");
const bodyParser = require("body-parser");

const {isJson,keyLength,jsonSize} = require('./controllers')
const {mp} = require('./singleton')
const {ttl} = require('./TimeToLive')
var app = express();


const port = 4000 || process.env.PORT  ;


const path = "./db.txt"




// read whole file-> db.txt
const data =  fs.readFileSync(path, 'utf-8')
const res = data.split("+");
            for(let i = 0;i < res.length-1;i++)
            {
                    const user = JSON.parse(res[i].toString());
                    mp.pushData(user.key,user.value);
                    ttl.pushData(user.key,5000)
                    console.log(user);
            }



//start body-parser configuratio
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));




app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post('/add', (req,res) => {
    let key = req.body.key;
    let interval = req.body.interval;
    let value = req.body.value;
  
   if( !isJson(value) )
      {
        res.send("Invalid format!! Only JSON object is accepted");
        return;
      } 
   
    if(!keyLength(key) )
      {
          res.send("Insert key of maximum 32 character!")
          return;
      } 

   if(!jsonSize(value) )
      {
        res.send("Object can be of maximum 16KB");
        return;
      }

    if(mp.getData(key) != undefined)
      {
        res.send(`${key} +  already exist`);
        return;
      } 
  
    res.send(req.body)


    
    let val = JSON.stringify(req.body);
    val = val + "+";
    fs.appendFileSync(path, val);
    // add data to singleton/mp
    mp.pushData(key, value)

    // push to cache
    ttl.pushData(key,interval);
    ttl.showCachememory();

   
})


app.get('/read', (req,res) => {
  const key = req.query.key;
 
  // check if ttl has expired
  if(ttl.isExpired(key)){
    return res.send(`${key}  has been deleted as key is expired`)
  }else{
    ttl.showCachememory();
    return res.send(mp.getData(key))
  }

 
  
 
})



app.delete('/delete',(req,res) => {
  const key = req.query.key;
  
  // check if ttl has expired
  if(ttl.isExpired(key)){
    
    return res.send(`${key} + " has been deleted as key is expire`)
  }
  // DELETE FROM MAPPER
  if(mp.getData(key) != undefined)
  {
    res.send(mp.getData(key))
    mp.deleteData(key);
  }
  
  // write to file
  //fs.writeFileSync(path, ""); 
  let filetowrite = mp.getAllData();
  fs.writeFileSync(path, filetowrite); 

  
})



app.listen(port, () => {
    console.log(`DS app listening at http://localhost:${port}`)
  })
  
 