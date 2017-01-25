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
    // validation only array of input validation not the form validation
    var specialObject = this.arrayToSpecialObj(validations)
    console.log(specialObject)
    var regexPattern = this.buildRegex(specialObject)
    console.log(regexPattern)

    var result = this.checkGeneratedResultToCallback(specialObject,regexPattern);
    return result;
  }

  function checkGeneratedResultToCallback(specialObject,regexPattern){
    if(regexPattern){
      var status = false;
      while (!status) {
        var result = new Randexp(regexPattern).gen()
        // check value apakah sesuai dengan callback juga
        // check if has callback
        console.log(result);
        if(specialObject.callbacks){
          //loop semua callback
          var callbackStatus = true;
          try{
            _.forEach(specialObject.callbacks,function(callback,index){
              var callbackValidation = callback.ruleCallback(callback,result)
              callbackStatus = callbackStatus && callbackValidation;
              if(typeof callbackValidation != "boolean"){
                result = callbackValidation;
              }
              if(!callbackStatus){
                throw new Error("Break");
              }
            })
          }catch(e){
            console.log(e.message);
          }
          console.log("----------");
          if(callbackStatus){
            status = true
          }
          //kalau gagal generate ulang (status false)
          //kalau berhasil (status true)
        }
      }
      return result
    }else{
      throw new Error("Could not build regelar expression from parameters provided")
    }
  }

  /**
   * Convert Array of Validation Rule to Special Object which used in building Regular Expression
   * @param {Array} validation Array of Validation rule
   */
  function arrayToSpecialObj(arrayOfValidation){
    var specialObject = {}

    specialObject.pattern = "."
    specialObject.callbacks = []

    _.forEach(arrayOfValidation,function(n,key){
      var size = n.split(':')
      if(size.length > 0 && size.length<=2){
        switch(size[0]){
          /*case 'required' :
              specialObject.min = 1
            break;
          case 'alpha' :
          case 'alpha_dash' :
          case 'alpha_num' :
          case 'email' :
            specialObject.pattern = rules[size[0]]
            if(size[0] === 'email'){
              delete specialObject.min;
              delete specialObject.max;
            }
            break;*/
          case 'min':
            var min = parseInt(size[1])
            if(min >= 0){
              if(!specialObject.notMax){
                specialObject.min= min
              }
            }else if(typeof size[1] === "undefined" || size[1] === "" ){
              throw new Error("Minimal size is undefined, please check your syntax at '"+n+"'")
            }else if(min<0){
              throw new Error("Minimal size is less than 0")
            }
            break;
          case '^min':
            var min = parseInt(size[1])
            if(min >= 1){
              specialObject.max= min-1
              specialObject.notMin = true;
            }else if(min === 0){
              specialObject.pattern = null
              specialObject.notMin = true;
            }else if(typeof size[1] === "undefined" || size[1] === "" ){
              throw new Error("Minimal size is undefined, please check your syntax at '"+n+"'")
            }else if(min<0){
              throw new Error("Minimal size is less than 0")
            }
            break;
          case 'max':
            var max = parseInt(size[1])
            if(max >= 0){
              if(!specialObject.notMin){
                specialObject.max= max
              }
            }else if(typeof size[1] === "undefined" || size[1] === "" ){
              throw new Error("Maximal size is undefined, please check your syntax at '"+n+"'")
            }else if(min<0){
              throw new Error("Maximal size is less than 0")
            }
            break;
          case '^max':
            var max = parseInt(size[1])
            if(max >= 1){
              specialObject.min= max+1
              specialObject.notMax = true
            }else if(typeof size[1] === "undefined" || size[1] === "" ){
              throw new Error("Maximal size is undefined, please check your syntax at '"+n+"'")
            }else if(min<0){
              throw new Error("Maximal size is less than 0")
            }
            break;
          case 'exact':
            var exactSize = parseInt(size[1])
            if(exactSize>=0){
              specialObject.min = exactSize
              specialObject.max = exactSize
            }else if(typeof size[1] === "undefined" || size[1] === ""){
              throw new Error("Exact size is undefined")
            }else if(exactSize<0){
              throw new Error("Exact size is less than 0")
            }else{
              throw new Error("Unknown Errors")
            }
            break;
          case '^exact':
            var exactSize = parseInt(size[1])
            if(exactSize>=0){
              specialObject.min = exactSize+1
              specialObject.max = exactSize-1
              specialObject.notMin = true
              specialObject.notMax = true
            }else if(typeof size[1] === "undefined" || size[1] === ""){
              throw new Error("Exact size is undefined")
            }else if(exactSize<0){
              throw new Error("Exact size is less than 0")
            }else{
              throw new Error("Unknown Errors")
            }
            break;
          case 'between':
            if(typeof size[1] != "undefined" && size[1] != ""){
              // throw new Error(size)
              var betweenSize = size[1].split(",")

              if(
                typeof betweenSize[0] != "undefined" &&
                typeof betweenSize[1] != "undefined" &&
                parseInt(betweenSize[0]) <= parseInt(betweenSize[1])
              ){
                specialObject.min = parseInt(betweenSize[0])
                specialObject.max = parseInt(betweenSize[1])

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
          case '^between':
            if(typeof size[1] != "undefined" && size[1] != ""){
              // throw new Error(size)
              var betweenSize = size[1].split(",")

              if(
                typeof betweenSize[0] != "undefined" &&
                typeof betweenSize[1] != "undefined" &&
                parseInt(betweenSize[0]) <= parseInt(betweenSize[1])
              ){
                specialObject.min = parseInt(betweenSize[0])+1
                specialObject.max = parseInt(betweenSize[1])-1
                specialObject.notMin = true
                specialObject.notMax = true

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
          default :
            if(typeof rules[size[0]] != "undefined"){
              if(typeof rules[size[0]] === "function"){
                // var callback = {
                //   'rule' : rules[size[0]],
                // }
                // specialObject.callbacks.push(callback);
                var customParam = {
                  'rule':size[0],
                  'completeRule':n
                }
                if(size.length>1){
                  customParam.ruleParam = size[1];
                }

                // eksekusi function nya
                if(size[0][0] === "^"){
                  customParam.negation = true
                }
                var customRuleRespon = rules[size[0]](customParam)
                console.log(customRuleRespon);
                // string berarti pattern baru
                // function berarti callback

                if(typeof customRuleRespon === "string"){
                  specialObject.pattern = customRuleRespon
                }else if(typeof customRuleRespon === "function"){
                  customParam.validations = arrayOfValidation;
                  customParam.ruleCallback = customRuleRespon;
                  specialObject.callbacks.push(customParam)
                }
              }else{
                specialObject.pattern = rules[size[0]]
              }
            }
            if(size[0] === 'required'){
              specialObject.min = 1
            }
            if(size[0] === 'email'){
              delete specialObject.min;
              delete specialObject.max;
            }
            break;
        }
      }
    })

    return specialObject;
  }

  /**
   * Build regex from special object
   * @param {Object} specialObject Special Object
   * @param {String} mode mode for RegExp {i,g,...}
   * @return {Object} Regular Expression Object
   */
  function buildRegex(specialObject, mode){
    if(typeof mode === "undefined"){
      mode = ""
    }
    if(specialObject.pattern){
      var size = this.getRegexSize(specialObject);
      var regexSize;
      var regexArray = []
      var regexPattern = "";

      _.forEach(size,function(data,index){
        // console.log(data)
        regexSize = data.join();
        console.log(regexSize);
        if(regexSize){
          regexSize = "{"+regexSize+"}"
        }
        if(!regexSize && (specialObject.pattern[(specialObject.pattern.length-1)] != ")" && specialObject.pattern[0] != "^")){
          specialObject.pattern += "+"
          regexArray.push("^"+specialObject.pattern+"")
        }else if(regexSize){
          regexArray.push(specialObject.pattern+regexSize)
        }else{
          regexArray.push(specialObject.pattern)
        }
        // console.log(regexArray);
      })

      regexPattern = regexArray.join("|")
      return new RegExp("("+regexPattern+")",mode);
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
    if(specialObject.min && specialObject.max){
      if(specialObject.min < 0 && specialObject.max < 0){
        // return new Error("Minimal and Maximal size is less than zero")
        return []
      }else{
        if(!isNaN(specialObject.min) && !isNaN(specialObject.max)){
          if(specialObject.notMax && specialObject.notMin){
            var size = [
              [0,specialObject.max],
              [specialObject.min,""]
            ]
          }else if (specialObject.notMin && !specialObject.notMax ){
            if(specialObject.min)
              var size = [[specialObject.min,specialObject.max]]
            else
              var size = [[0,specialObject.max]]

          }else if (specialObject.notMax && !specialObject.notMin){
            var size = [[specialObject.min,""]]
          }else{
            var size = [[specialObject.min,specialObject.max]]
          }
        }else if(isNaN(specialObject.min) && !isNaN(specialObject.max)){
          // return new Error("Minimal size is not a number")
          return [[]]
        }else if(!isNaN(specialObject.min) && isNaN(specialObject.max)){
          // return new Error("Maximal size is not a number")
          return [[]]
        }else{
          // return new Error("Minimal and Maximal size is not a number")
          return [[]]
        }
      }
    }else if(specialObject.min){
      if(specialObject.min < 0){
        // return new Error("Minimal size is less than zero")
        return [[]]
      }else{
        if(!isNaN(specialObject.min)){
          var size = [[specialObject.min,""]]
        }else{
          // return new Error("Minimal size is not a number")
          return [[]]
        }
      }
    }else if(specialObject.max){
      if(specialObject.max < 0){
        // return new Error("Maximal size is less than zero")
        return [[]]
      }else{
        if(!isNaN(specialObject.max)){
            var size = [[0,specialObject.max]];
        }else{
          // return new Error("Maximal size is not a number")
          return [[]]
        }
      }
    }else{
      // return new Error("Minimal or Maximal size is undefined")
      return [[]]
    }

    return size;
  }

  function injectCustomRule(name,path){
    rules[name] = require(path)
  }

  return {
    'arrayToSpecialObj' : arrayToSpecialObj,
    'buildRegex' : buildRegex,
    'getRegexSize' : getRegexSize,
    'generate' : generate,
    'checkGeneratedResultToCallback' : checkGeneratedResultToCallback,
    'injectCustomRule' : injectCustomRule,
    'rules':rules
  }
}

module.exports = data();
