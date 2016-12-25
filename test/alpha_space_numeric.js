var  alpha_space_number = function(param){
  if(param.negation){
    return "[^0-9a-zA-Z ]"
  }else{
    return "[0-9a-zA-Z ]"
  }
}

module.exports = alpha_space_number;
