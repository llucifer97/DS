
const { type } = require('os');
const { isArray } = require('util');
const fs = require('fs');



const isJson = (value) => {
    if( value == null || isArray(value) === true || value === undefined)
        {
          console.log("Invalid format!! Only JSON object is accepted");
          return false;
        }

      return true;
}



const keyLength = (key) => {
  if(key.length > 32)
    {
      console.log("Insert key of maximum 32 character!")
      return false;
    }
    return true;
}

const jsonSize = (value) => {
    const size = Buffer.byteLength(JSON.stringify(value))
    if(size > 16000){
        console.log("Object can be of maximum 16KB")
        return false;
    }
    return true;
}




module.exports = {
    jsonSize,
    keyLength,
    isJson
};