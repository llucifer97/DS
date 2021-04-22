

class HashMap {
    constructor() 
    {
        this.mp = new Map();
    }

        pushData(key,value)
            {
                this.mp.set(key,value)
            }
  

        getData(key)
            {
                return this.mp.get(key)
            }

        deleteData(key)
        {
            this.mp.delete(key)
        }

        getAllData()
        {
            let arr =[]
    
            for (let [key, value] of this.mp) { 
            let data = {
                "key" : key,
                "value" : value
            }
        
            arr.push(data);
            }
        
            let filetowrite = "";
            for(let i = 0; i< arr.length;i++)
            {
            filetowrite += JSON.stringify(arr[i]) + "+";
            }

            return filetowrite;
        
        }


    
  }
  
  const mp = new HashMap()
  Object.freeze(mp)






module.exports = {
   mp
};
