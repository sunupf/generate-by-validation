var data  = function(){
  var Randexp = require("randexp");
  var _ = require("lodash");

  var rules = require("./rules");

  /**
   * Generate string based on validation
   * @param {String} validation validation rule
   */
  function generate(validations){
    // Convert string to Special Object
    var specialObject = arrayToSpecialObj(arrayOfValidation)
  }

  /**
   * Convert Array of Validation Rule to Special Object which used in building Regular Expression
   * @param {Array} validation Array of Validation rule
   */
  function arrayToSpecialObj(arrayOfValidation){
    var specialObject = {}

    specialObject.pattern = "."

    _.forEach(arrayOfValidation,function(n,key){
      var size = n.split(':')
      if(size.length > 0 && size.length<=2){
        switch(size[0]){
          case 'alpha' :
          case 'alpha_dash' :
          case 'alpha_num' :
          case 'email' :
            specialObject.pattern = rules[size[0]].pattern
            if(size[0] === 'email'){
              delete specialObject.size;
            }
            break;
          case 'min':
          case '^min':
            var min = parseInt(size[1])
            if(min >= 0){
              specialObject.min = {"value":min}
              if(size[0]=="min"){
                specialObject.min.negation : false;
              }else{
                specialObject.min.negation : true;
              }
            }else if(typeof size[1] === "undefined" || size[1] === "" ){
              throw new Error("Minimal size is undefined, please check your syntax at '"+n+"'")
            }else if(min<0){
              throw new Error("Minimal size is less than 0")
            }
            break;
          case 'max':
          case '^max':
            var max = parseInt(size[1])
            if(max >= 0){
              specialObject.max = {"value":max}
              if(size[0]=="max"){
                specialObject.max.negation : false;
              }else{
                specialObject.max.negation : true;
              }
            }else if(typeof size[1] === "undefined" || size[1] === "" ){
              throw new Error("Maximal size is undefined, please check your syntax at '"+n+"'")
            }else if(min<0){
              throw new Error("Maximal size is less than 0")
            }
            break;
          case 'exact':
          case '^exact':
            var exactSize = parseInt(size[1])
            if(exactSize>=0){
              specialObject.min = {"value":exactSize}
              specialObject.max = {"value":exactSize}
              if(size[0]=="exact"){
                specialObject.max.negation : false;
                specialObject.min.negation : false;
              }else{
                specialObject.max.negation : true;
                specialObject.min.negation : true;
              }
            }else if(typeof size[1] === "undefined" || size[1] === ""){
              throw new Error("Exact size is undefined")
            }else if(exactSize<0){
              throw new Error("Exact size is less than 0")
            }else{
              throw new Error("Unknown Errors")
            }
            break;
          case 'between':
          case '^between':
            if(typeof size[1] != "undefined" && size[1] != ""){
              // throw new Error(size)
              var betweenSize = size[1].split(",")

              if(
                typeof betweenSize[0] != "undefined" &&
                typeof betweenSize[1] != "undefined" &&
                parseInt(betweenSize[0]) <= parseInt(betweenSize[1])
              ){
                specialObject.min = {"value":parseInt(betweenSize[0])}
                specialObject.max = {"value":parseInt(betweenSize[1])}
                if(size[0]=="between"){
                  specialObject.max.negation : false;
                  specialObject.min.negation : false;
                }else{
                  specialObject.max.negation : true;
                  specialObject.min.negation : true;
                }
                if(specialObject.min<0){
                  throw new Error("Minimal size is less than 0")
                }
                if(specialObject.max<0){
                  throw new Error("Minimal size is less than 0")
                }
              }else if(typeof betweenSize[0] === "undefined" || betweenSize[0] === ""){
                // Throw Error
                throw new Error("Minimal size is undefined, please check your syntax at '"+n+"'")
              }else if(typeof betweenSize[1] === "undefined" || betweenSize[1] === ""){
                // Throw Error
                throw new Error("Maximal size is undefined, please check your syntax at '"+n+"'")
              }else if(parseInt(betweenSize[0])>parseInt(betweenSize[1])){
                // Throw Error
                throw new Error("Minimal Size has bigger value than Maximal Size")
              }else{
                throw new Error("Unknown Error")
              }
            }else{
              // Throw Error
              throw new Error("Minimal and Maximal Size are undefined, please check yout syntax at '"+n+"'")
            }
            break;
        }
      }
    })

    /* // try{
    //   _.forEach(arrayOfValidation,function(n,key){
    //
    //     var size = n.split(':')
    //     if(size.length > 0 && size.length<=2){
    //       switch(size[0]){
    //         case 'min':
    //           var min = parseInt(size[1])
    //           if(min >= 0){
    //             specialObject.sizeMin = min
    //           }else if(typeof size[1] === "undefined" || size[1] === "" ){
    //             throw new Error("Minimal size is undefined, please check your syntax at '"+n+"'")
    //           }else if(min<0){
    //             throw new Error("Minimal size is less than 0")
    //           }
    //           break;
    //         case 'max':
    //           var min = parseInt(size[1])
    //           if(min >= 0){
    //             specialObject.sizeMax = parseInt(size[1])
    //           }else if(typeof size[1] === "undefined" || size[1] === "" ){
    //             throw new Error("Maximal size is undefined, please check your syntax at '"+n+"'")
    //           }else if(min<0){
    //             throw new Error("Maximal size is less than 0")
    //           }
    //           break;
    //         case 'exact':
    //           var exactSize = parseInt(size[1])
    //           if(exactSize>=0){
    //             specialObject.sizeMin = exactSize
    //             specialObject.sizeMax = exactSize
    //           }else if(typeof size[1] === "undefined" || size[1] === ""){
    //             throw new Error("Exact size is undefined")
    //           }else if(exactSize<0){
    //             throw new Error("Exact size is less than 0")
    //           }else{
    //             throw new Error("Unknown Errors")
    //           }
    //           break;
    //         case 'between':
    //           if(typeof size[1] != "undefined" && size[1] != ""){
    //             // throw new Error(size)
    //             var betweenSize = size[1].split(",")
    //
    //             if(
    //               typeof betweenSize[0] != "undefined" &&
    //               typeof betweenSize[1] != "undefined" &&
    //               parseInt(betweenSize[0]) <= parseInt(betweenSize[1])
    //             ){
    //               specialObject.sizeMin = parseInt(betweenSize[0])
    //               specialObject.sizeMax = parseInt(betweenSize[1])
    //               if(specialObject.sizeMin<0){
    //                 throw new Error("Minimal size is less than 0")
    //               }
    //               if(specialObject.sizeMax<0){
    //                 throw new Error("Minimal size is less than 0")
    //               }
    //             }else if(typeof betweenSize[0] === "undefined" || betweenSize[0] === ""){
    //               // Throw Error
    //               throw new Error("Minimal size is undefined, please check your syntax at '"+n+"'")
    //             }else if(typeof betweenSize[1] === "undefined" || betweenSize[1] === ""){
    //               // Throw Error
    //               throw new Error("Maximal size is undefined, please check your syntax at '"+n+"'")
    //             }else if(parseInt(betweenSize[0])>parseInt(betweenSize[1])){
    //               // Throw Error
    //               throw new Error("Minimal Size has bigger value than Maximal Size")
    //             }else{
    //               throw new Error("Unknown Error")
    //             }
    //           }else{
    //             // Throw Error
    //             throw new Error("Minimal and Maximal Size are undefined, please check yout syntax at '"+n+"'")
    //           }
    //           break;
    //         case 'required':
    //           if(!notMatch){
    //             specialObject.sizeMin = 1
    //           }else if(specialObject.pattern === "." && notMatch){
    //             specialObject.pattern = "[ ]"
    //           }else{
    //
    //           }
    //           break;
    //         case 'alpha' :
    //         case 'alpha_dash' :
    //         case 'alpha_num' :
    //         case 'email' :
    //           if(notMatch){
    //             specialObject.pattern = availablePattern[size[0]].notMatch
    //           }else{
    //             specialObject.pattern = availablePattern[size[0]].pattern
    //           }
    //           if(size[0] === 'email'){
    //             delete specialObject.sizeMin;
    //           }
    //           break;
    //         default:
    //           throw new Error("Unsupported validation")
    //           break;
    //       }
    //     }else{
    //       throw new Error("Unsupported validation")
    //     }
    //   })
    // // }catch(e){
    //   // return e
    // // } */
    return specialObject;
  }
  /**
   * Build regex from special object
   * @param {Object} specialObject Special Object
   * @param {String} mode mode for RegExp {i,g,...}
   * @return {Object} Regular Expression Object
   */
  function buildRegex(specialObject, mode){
    if(specialObject.pattern){
      if(typeof mode === "undefined"){
        mode = ""
      }
      var size = getRegexSize(specialObject);
      var regexSize;

      regexSize = size.join();
      if(regexSize){
        regexSize = "{"+regexSize+"}"
      }

      if(!regexSize && specialObject.pattern[(specialObject.pattern.length-1)] != "}"){
        specialObject.pattern += "+"
      }

      return new RegExp("^"+specialObject.pattern+regexSize+"$",mode);
    }else{
      throw new Error("Couldn't generate regex because of undefined pattern")
    }
  }
  /**
   * Build regex from special object for not match option
   * @param {Object} specialObject Special Object
   * @param {String} mode mode for RegExp {i,g,...}
   * @return {Object} Regular Expression Object
   */
  function buildNotMatchRegex(specialObject, mode){
    if(specialObject.pattern){
      if(typeof mode === "undefined"){
        mode = ""
      }
      var size = getRegexSize(specialObject);
      var regexSize;

      regexSize = size.join();
      if(regexSize){
        if(size[0]>0 && size[1]>0){
          return new RegExp("^("+specialObject.pattern+"{0,"+(size[0]-1)+"}|"+specialObject.pattern+"{"+(size[1]+1)+",})$",mode);
        }
        if(size[0] === 0){
          return new RegExp("^"+specialObject.pattern+"{"+(size[1]+1)+",}$",mode);
        }
        if(size[1] === ""){
          return new RegExp("^"+specialObject.pattern+"{0,"+(size[0]-1)+"}$",mode);
        }
      }else{
        if(specialObject.pattern[(specialObject.pattern.length-1)] != "}"){
          specialObject.pattern += "*"
        }
        return new RegExp("^"+specialObject.pattern+"$",mode);
      }
    }else{
      throw new Error("Couldn't generate regex because of undefined pattern")
    }
  }
  /**
  * Get regex rule Size
  * @param {Object} specialObject Special Object
  * @return {Mixed} String when success {x,y} x is min, and y is max, and FALSE when fail
  */
  function getRegexSize(specialObject){
    if(specialObject.sizeMin && specialObject.sizeMax){
      if(specialObject.sizeMin < 0 && specialObject.sizeMax < 0){
        // return new Error("Minimal and Maximal size is less than zero")
        return []
      }else{
        if(!isNaN(specialObject.sizeMin) && !isNaN(specialObject.sizeMax)){
          var size = [specialObject.sizeMin,specialObject.sizeMax]
        }else if(isNaN(specialObject.sizeMin) && !isNaN(specialObject.sizeMax)){
          // return new Error("Minimal size is not a number")
          return []
        }else if(!isNaN(specialObject.sizeMin) && isNaN(specialObject.sizeMax)){
          // return new Error("Maximal size is not a number")
          return []
        }else{
          // return new Error("Minimal and Maximal size is not a number")
          return []
        }
      }
    }else if(specialObject.sizeMin){
      if(specialObject.sizeMin < 0){
        // return new Error("Minimal size is less than zero")
        return []
      }else{
        if(!isNaN(specialObject.sizeMin)){
          var size = [specialObject.sizeMin,""]
        }else{
          // return new Error("Minimal size is not a number")
          return []
        }
      }
    }else if(specialObject.sizeMax){
      if(specialObject.sizeMax < 0){
        // return new Error("Maximal size is less than zero")
        return []
      }else{
        if(!isNaN(specialObject.sizeMax)){
          var size = [0,specialObject.sizeMax];
        }else{
          // return new Error("Maximal size is not a number")
          return []
        }
      }
    }else{
      // return new Error("Minimal or Maximal size is undefined")
      return []
    }

    return size;
  }

  return {
    'stringToArray' : stringToArray,
    'arrayToSpecialObj' : arrayToSpecialObj,
    'buildRegex' : buildRegex,
    'buildNotMatchRegex' : buildNotMatchRegex,
    'getRegexSize' : getRegexSize,
    'generate' : generate,
  }
}

module.exports = data();
