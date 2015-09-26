var assert = require("chai").assert
var data = require("../generate")

/**
 * buildNotMatchRegex Test
 */
describe("Test buildNotMatchRegex",function(){
  /**
   * NOrmal case for buildNotMatchRegex
   */
  describe("Normal Input",function(){
    /**
     * Build RegExp without mode
     */
    it("Without Mode",function(){
      var specialObject = {
        'pattern' : "[^a-zA-Z]",
        'sizeMin' : 8,
        'sizeMax' : 25
      }
      var expected = new RegExp("^([^a-zA-Z]{0,7}|[^a-zA-Z]{26,})$")

      var result = data.buildNotMatchRegex(specialObject)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with mode
     */
    it("With Mode",function(){
      var specialObject = {
        'pattern' : "[^a-zA-Z]",
        'sizeMin' : 8,
        'sizeMax' : 25
      }
      var mode = "i"
      var expected = new RegExp("^([^a-zA-Z]{0,7}|[^a-zA-Z]{26,})$",mode)

      var result = data.buildNotMatchRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with min max
     */
    it("Without min and max length",function(){
      var specialObject = {
        'pattern' : "[^a-zA-Z]"
      }
      var expected = new RegExp("^[^a-zA-Z]*$")

      var result = data.buildNotMatchRegex(specialObject)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp without min max with mode
     */
    it("Without min and max length with mode",function(){
      var specialObject = {
        'pattern' : "[^a-zA-Z]"
      }
      var mode = "i"
      var expected = new RegExp("^[^a-zA-Z]*$",mode)

      var result = data.buildNotMatchRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with min option
     */
    it("Min length with mode",function(){
      var specialObject = {
        'pattern' : "[^a-zA-Z]",
        'sizeMin' : 7
      }
      var mode = "i"
      var expected = new RegExp("^[^a-zA-Z]{0,6}$",mode)

      var result = data.buildNotMatchRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with max option
     */
    it("Min length with mode",function(){
      var specialObject = {
        'pattern' : "[^a-zA-Z]",
        'sizeMax' : 20
      }
      var mode = "i"
      var expected = new RegExp("^[^a-zA-Z]{21,}$",mode)

      var result = data.buildNotMatchRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
  })
  /**
   * Falsey Input for build regex
   */
  describe("Falsey (\"\") Input",function(){
    /**
     * Pattern is ""
     */
    it("Pattern is \"\"",function(){
      var specialObject = {
        'pattern' : ""
      }
      var mode = "i"
      var expected = false

      var result = data.buildNotMatchRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
    /**
     * Pattern is undefined
     */
    it("Pattern is undefined",function(){
      var specialObject = {}
      var mode = "i"
      var expected = false

      var result = data.buildNotMatchRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
  })
})
