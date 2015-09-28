var assert = require("chai").assert
var data = require("../generate")

describe("Test arrayToSpecialObj",function(){
  /**
   * Test for match mode
   */
   describe("Match mode",function(){
     /**
      * Section Special Object Size testing
      */
     describe("Special Object Size",function(){
       /**
        * Special Object test Min rule
        */
       describe("Min Rule",function(){
         /**
          * NOrmal case for min rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"min:8"]
           var expected = {
             'pattern' : ".",
             'sizeMin' : 8
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
         /**
          * Undefined case for min rule
          */
         it("Undefined value",function(){
           var expected = "Minimal size is undefined, please check your syntax at 'min'"
           var arrayOfValidation = ['required',"min"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var expected = "Minimal size is undefined, please check your syntax at 'min:'"
           var arrayOfValidation = ['required',"min:"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Less than Zero case for min rule
          */
         it("Less than Zero value",function(){
           var expected = "Minimal size is less than 0"

           var arrayOfValidation = ['required',"min:-1"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
       })
       /**
        * Special Object test Max rule
        */
       describe("Max Rule",function(){
         /**
          * NOrmal case for max rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"max:8"]
           var expected = {
             'pattern' : ".",
             'sizeMin' : 1,
             'sizeMax' : 8
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
         /**
          * NOrmal case for required and one rule
          */
         it("Required x rule at begining",function(){
           var arrayOfValidation = ['required','alpha',"max:8"]
           var expected = {
             'pattern' : "[a-zA-Z]",
             'sizeMin' : 1,
             'sizeMax' : 8,
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
         /**
          * NOrmal case for required and one rule
          */
         it("Required x rule at the end",function(){
           var arrayOfValidation = ['alpha','required',"max:8"]
           var expected = {
             'pattern' : "[a-zA-Z]",
             'sizeMin' : 1,
             'sizeMax' : 8,
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
         /**
          * Undefined case for max rule
          */
         it("Undefined value",function(){
           var expected = "Maximal size is undefined, please check your syntax at 'max'"


           var arrayOfValidation = ['required',"max"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var arrayOfValidation = ['required',"max:"]
           var expected = "Maximal size is undefined, please check your syntax at 'max:'"
           try{
             var result = data.arrayToSpecialObj(arrayOfValidation)
           }catch(e){
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Less than Zero case for max rule
          */
         it("Less than Zero value",function(){
           var expected = "Maximal size is less than 0"

           var arrayOfValidation = ['required',"max:-1"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
       })

       /**
        * Special Object Between Rule
        */
       describe("Between Rule",function(){
         /**
          * Between normal rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"between:8,20"]
           var expected = {
             'pattern' : ".",
             'sizeMin' : 8,
             'sizeMax' : 20
           }

           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e,expected);
           }
         })
         /**
          * Between when Min > then Max
          */
         it("Min > Max",function(){
           var arrayOfValidation = ['required',"between:20,8"]
           var expected = "Minimal Size has bigger value than Maximal Size"

           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between when MIn > then Max but write at the begining of rule
          */
         it("Min > Max at begining",function(){
           var arrayOfValidation = ["between:20,8",'required']
           var expected = "Minimal Size has bigger value than Maximal Size"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule when Min value Undefined
          */
         it("Min value Undefined",function(){
           var arrayOfValidation = ["between:,10",'required']
           var expected = "Minimal size is undefined, please check your syntax at 'between:,10'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule when Max value Undefined
          */
         it("Max value Undefined",function(){
           var arrayOfValidation = ["between:10",'required']
           var expected = "Maximal size is undefined, please check your syntax at 'between:10'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var arrayOfValidation = ["between:10,",'required']
           var expected = "Maximal size is undefined, please check your syntax at 'between:10,'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule when Min and Max value Undefined
          */
         it("Min and Max value Undefined",function(){
           var arrayOfValidation = ["between",'required']
           var expected = "Minimal and Maximal Size are undefined, please check yout syntax at 'between'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var arrayOfValidation = ["between:",'required']
           var expected = "Minimal and Maximal Size are undefined, please check yout syntax at 'between:'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule min value less than 0
          */
         it("Min value less than 0",function(){
           var arrayOfValidation = ["between:-1,10",'required']
           var expected = "Minimal size is less than 0"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })

         /**
          * Between rule max value less than 0
          */
         it("Max value less than 0",function(){
           var arrayOfValidation = ["between:2,-2",'required']
           var expected = "Minimal Size has bigger value than Maximal Size"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })

         /**
          * Between rule min max value less than 0
          */
         it("Min and Max value less than 0",function(){
           var arrayOfValidation = ["between:-2,-1",'required']
           var expected = "Minimal size is less than 0"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
       })

       /**
        * Special Object Exact Rule
        */
       describe("Exact Rule",function(){
         /**
          * NOrmal Case for exact rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"exact:7"]
           var expected = {
             'pattern' : ".",
             'sizeMin' : 7,
             'sizeMax' : 7
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
         /**
          * Exact size Undefined
          */
         it("Undefined value",function(){
           var arrayOfValidation = ['required',"exact"]
           var expected = "Exact size is undefined"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var arrayOfValidation = ['required',"exact:"]
           var expected = "Exact size is undefined"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Exact size is less than Zero
          */
         it("Less than zero value",function(){
           var arrayOfValidation = ['required',"exact:-1"]
           var expected = "Exact size is less than 0"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
       })
     })

     /**
      * Section Special Object Pattern Testing
      */
     describe("Special Object Pattern",function(){
       /**
        * Alpha Pattern testing
        */
       describe("Alpha Rule",function(){
         /**
          * Min max rule on alpha rule
          */
         it("Min Max Rule",function(){
           var arrayOfValidation = ['alpha',"min:8","max:20"]
           var expected = {
             'pattern' : "[a-zA-Z]",
             'sizeMin' : 8,
             'sizeMax' : 20
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
         /**
          * Exact size on Alpha pattern
          */
         it("Exact Rule",function(){
           var arrayOfValidation = ['alpha',"exact:20"]
           var expected = {
             'pattern' : "[a-zA-Z]",
             'sizeMin' : 20,
             'sizeMax' : 20
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
         /**
          * Between size on alpha pattern
          */
         it("Between Rule",function(){
           var arrayOfValidation = ['alpha',"between:8,20"]
           var expected = {
             'pattern' : "[a-zA-Z]",
             'sizeMin' : 8,
             'sizeMax' : 20
           }

           var result = data.arrayToSpecialObj(arrayOfValidation)
           assert.deepEqual(result,expected);
         })
       })
     })
   })
  /**
   * Test for not match mode
   */
   describe("NOT Match mode",function(){
     /**
      * Section Special Object Size testing
      */
     describe("Special Object Size",function(){
       /**
        * Special Object test Min rule
        */
       describe("Min Rule",function(){
         /**
          * NOrmal case for min rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"min:8"]
           var expected = {
             'pattern' : "[ ]",
             'sizeMin' : 8
           }

           var result = data.arrayToSpecialObj(arrayOfValidation,true)
           assert.deepEqual(result,expected);
         })

         /**
          * Undefined case for min rule
          */
         it("Undefined value",function(){
           var expected = "Minimal size is undefined, please check your syntax at 'min'"

           var arrayOfValidation = ['required',"min"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var expected = "Minimal size is undefined, please check your syntax at 'min:'"
           var arrayOfValidation = ['required',"min:"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Less than Zero case for min rule
          */
         it("Less than Zero value",function(){
           var expected = "Minimal size is less than 0"

           var arrayOfValidation = ['required',"min:-1"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
       })
       /**
        * Special Object test Max rule
        */
       describe("Max Rule",function(){
         /**
          * NOrmal case for max rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"max:8"]
           var expected = {
             'pattern' : "[ ]",
             'sizeMax' : 8
           }

           var result = data.arrayToSpecialObj(arrayOfValidation, true)
           assert.deepEqual(result,expected);
         })
         /**
          * NOrmal case for required and one rule
          */
         it("Required x rule at begining",function(){
           var arrayOfValidation = ['required','alpha',"max:8"]
           var expected = {
             'pattern' : "[^a-zA-Z]",
             'sizeMax' : 8
           }

           var result = data.arrayToSpecialObj(arrayOfValidation,true)
           assert.deepEqual(result,expected);
         })
         /**
          * NOrmal case for required and one rule
          */
         it("Required x rule at the end",function(){
           var arrayOfValidation = ['alpha','required',"max:8"]
           var expected = {
             'pattern' : "[^a-zA-Z]",
             'sizeMax' : 8
           }

           var result = data.arrayToSpecialObj(arrayOfValidation,true)
           assert.deepEqual(result,expected);
         })
         /**
          * Undefined case for max rule
          */
         it("Undefined value",function(){
           var expected = "Maximal size is undefined, please check your syntax at 'max'"

           var arrayOfValidation = ['required',"max"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var expected = "Maximal size is undefined, please check your syntax at 'max:'"
           var arrayOfValidation = ['required',"max:"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Less than Zero case for max rule
          */
         it("Less than Zero value",function(){
           var expected = "Maximal size is less than 0"

           var arrayOfValidation = ['required',"max:-1"]
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
       })

       /**
        * Special Object Between Rule
        */
       describe("Between Rule",function(){
         /**
          * Between normal rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"between:8,20"]
           var expected = {
             'pattern' : "[ ]",
             'sizeMin' : 8,
             'sizeMax' : 20
           }

           var result = data.arrayToSpecialObj(arrayOfValidation, true)
           assert.deepEqual(result,expected);
         })
         /**
          * Between when Min > then Max
          */
         it("Min > Max",function(){
           var arrayOfValidation = ['required',"between:20,8"]
           var expected = "Minimal Size has bigger value than Maximal Size"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between when MIn > then Max but write at the begining of rule
          */
         it("Min > Max at begining",function(){
           var arrayOfValidation = ["between:20,8",'required']
           var expected = "Minimal Size has bigger value than Maximal Size"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule when Min value Undefined
          */
         it("Min value Undefined",function(){
           var arrayOfValidation = ["between:,10",'required']
           var expected = "Minimal size is undefined, please check your syntax at 'between:,10'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule when Max value Undefined
          */
         it("Max value Undefined",function(){
           var arrayOfValidation = ["between:10",'required']
           var expected = "Maximal size is undefined, please check your syntax at 'between:10'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var arrayOfValidation = ["between:10,",'required']
           var expected = "Maximal size is undefined, please check your syntax at 'between:10,'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule when Min and Max value Undefined
          */
         it("Min and Max value Undefined",function(){
           var arrayOfValidation = ["between",'required']
           var expected = "Minimal and Maximal Size are undefined, please check yout syntax at 'between'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }

           var arrayOfValidation = ["between:",'required']
           var expected = "Minimal and Maximal Size are undefined, please check yout syntax at 'between:'"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Between rule min value less than 0
          */
         it("Min value less than 0",function(){
           var arrayOfValidation = ["between:-1,10",'required']
           var expected = "Minimal size is less than 0"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })

         /**
          * Between rule max value less than 0
          */
         it("Max value less than 0",function(){
           var arrayOfValidation = ["between:2,-2",'required']
           var expected = "Minimal Size has bigger value than Maximal Size"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })

         /**
          * Between rule min max value less than 0
          */
         it("Min and Max value less than 0",function(){
           var arrayOfValidation = ["between:-2,-1",'required']
           var expected = "Minimal size is less than 0"
           try {
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           } catch (e) {
             assert.deepEqual(e.message,expected);
           }
         })
       })

       /**
        * Special Object Exact Rule
        */
       describe("Exact Rule",function(){
         /**
          * NOrmal Case for exact rule
          */
         it("Normal",function(){
           var arrayOfValidation = ['required',"exact:7"]
           var expected = {
             'pattern' : "[ ]",
             'sizeMin' : 7,
             'sizeMax' : 7
           }

           var result = data.arrayToSpecialObj(arrayOfValidation, true)
           assert.deepEqual(result,expected);
         })
         /**
          * Exact size Undefined
          */
         it("Undefined value",function(){
           var arrayOfValidation = ['required',"exact"]
           var expected = "Exact size is undefined"
           try{
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           }catch(e){
             assert.deepEqual(e.message,expected);
           }

           var arrayOfValidation = ['required',"exact:"]
           try{
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           }catch(e){
             assert.deepEqual(e.message,expected);
           }
         })
         /**
          * Exact size is less than Zero
          */
         it("Less than zero value",function(){
           var arrayOfValidation = ['required',"exact:-1"]
           var expected = "Exact size is less than 0"
           try{
             var result = data.arrayToSpecialObj(arrayOfValidation, true)
           }catch(e){
             assert.deepEqual(e.message,expected);
           }
         })
       })
     })

     /**
      * Section Special Object Pattern Testing
      */
     describe("Special Object Pattern",function(){
       /**
        * Alpha Pattern testing
        */
       describe("Alpha Rule",function(){
         /**
          * Min max rule on alpha rule
          */
         it("Min Max Rule",function(){
           var arrayOfValidation = ['alpha',"min:8","max:20"]
           var expected = {
             'pattern' : "[^a-zA-Z]",
             'sizeMin' : 8,
             'sizeMax' : 20
           }

           var result = data.arrayToSpecialObj(arrayOfValidation, true)
           assert.deepEqual(result,expected);
         })
         /**
          * Exact size on Alpha pattern
          */
         it("Exact Rule",function(){
           var arrayOfValidation = ['alpha',"exact:20"]
           var expected = {
             'pattern' : "[^a-zA-Z]",
             'sizeMin' : 20,
             'sizeMax' : 20
           }

           var result = data.arrayToSpecialObj(arrayOfValidation, true)
           assert.deepEqual(result,expected);
         })
         /**
          * Between size on alpha pattern
          */
         it("Between Rule",function(){
           var arrayOfValidation = ['alpha',"between:8,20"]
           var expected = {
             'pattern' : "[^a-zA-Z]",
             'sizeMin' : 8,
             'sizeMax' : 20
           }

           var result = data.arrayToSpecialObj(arrayOfValidation, true)
           assert.deepEqual(result,expected);
         })
       })
     })
   })
})
