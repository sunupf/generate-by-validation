var  not_z = function(param){
  var customRule = function(param,value){
    if(value === "z"){
      return false
    }
    return true
  }

  return customRule;
}

module.exports = not_z;
