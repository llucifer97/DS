const {mp} = require('./singleton')

class TTL {
        constructor() 
        {
            this.store = new Map();
            
        }

        pushData(key,time)
            {
                let timestamp = new Date();
                this.store.set(key,{"time" : time,"timestamp":timestamp})
            }
  

        isExpired(key)
            {
                if(this.store.get(key) === undefined)
                {
                    console.log(`${key}` + " does not exist in cache");
                    //return {"message" : `${key} + " does not exist in cache`};
                    return true;
                }
                let timenow = new Date();
                let timestamp = this.store.get(key).timestamp;
                let timediff = (timenow.getTime() - timestamp.getTime()) / 1000;
                if(timediff > this.store.get(key).time )
                {
                    console.log(timediff,  "time has passed")
                    // delete from  store
                    this.store.delete(key)
                    // delete from mp
                    mp.deleteData(key);
                    console.log(`${key} + " has been deleted as key is expired`);
                    //return {"message" : `${key} + " does not exist in cache`};
                    return true;
                }
                return false;
            }

            showCachememory()
            {
               
    
                for (let [key, value] of this.store) { 
                let data = {
                    "key" : key,
                    "value" : value
                }

                console.log(data)
            
                
                }
            
                

                
            }
    
  }
  
  const ttl = new TTL()
  Object.freeze(ttl)



module.exports = {
   ttl
};
