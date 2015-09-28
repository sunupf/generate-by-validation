var assert = require("chai").assert
var data = require("../generate")

describe("Test stringtoArray",function(){
  describe("Normal Input",function(){
    it("Should be return array of validation",function(){
      var validation = "required|min:8|max:20"
      var expected = ['required',"min:8","max:20"]

      var result = data.stringToArray(validation)

      assert.deepEqual(result,expected);
    })
    it("Should be return array of validation when input string there is no pipe '|'",function(){
      var validation = "required"
      var expected = ['required']

      var result = data.stringToArray(validation)

      assert.deepEqual(result,expected);
    })
  })
  describe("Falsey (\"\") Input",function(){

    it("Null string at middle of string",function(){
      var expected = ['required',"min:8","max:20"]
      var validation = "required||min:8|max:20"
      var result = data.stringToArray(validation)
      assert.deepEqual(result,expected);
    })

    it("Null string at begining of string",function(){
      var validation = "|min:8|max:20"
      var expected = ["min:8","max:20"]
      result = data.stringToArray(validation)
      assert.deepEqual(result,expected);
    })

    it("Null string at the end of string",function(){
      var validation = "min:8|"
      var expected = ["min:8"]
      result = data.stringToArray(validation)
      assert.deepEqual(result,expected);
    })
    it("Undefined string",function(){
      var validation = ""
      var expected = []
      result = data.stringToArray(validation)
      assert.deepEqual(result,expected);
    })
  })
})
