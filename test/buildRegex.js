var assert = require("chai").assert
var data = require("../generate")

/**
 * buildRegex Test
 */
describe("Test buildRegex",function(){
  /**
   * NOrmal case for buildRegex
   */
  describe("Normal Input",function(){
    /**
     * Build RegExp without mode
     */
    it("Without Mode",function(){
      var specialObject = {
        'pattern' : "[a-zA-Z]",
        'sizeMin' : 8,
        'sizeMax' : 25
      }
      var expected = new RegExp("^[a-zA-Z]{8,25}$")

      var result = data.buildRegex(specialObject)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with mode
     */
    it("With Mode",function(){
      var specialObject = {
        'pattern' : "[a-zA-Z]",
        'sizeMin' : 8,
        'sizeMax' : 25
      }
      var mode = "i"
      var expected = new RegExp("^[a-zA-Z]{8,25}$",mode)

      var result = data.buildRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with min max
     */
    it("Without min and max length",function(){
      var specialObject = {
        'pattern' : "[a-zA-Z]"
      }
      var expected = new RegExp("^[a-zA-Z]+$")

      var result = data.buildRegex(specialObject)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp without min max with mode
     */
    it("Without min and max length with mode",function(){
      var specialObject = {
        'pattern' : "[a-zA-Z]"
      }
      var mode = "i"
      var expected = new RegExp("^[a-zA-Z]+$",mode)

      var result = data.buildRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with min option
     */
    it("Min length with mode",function(){
      var specialObject = {
        'pattern' : "[a-zA-Z]",
        'sizeMin' : 7
      }
      var mode = "i"
      var expected = new RegExp("^[a-zA-Z]{7,}$",mode)

      var result = data.buildRegex(specialObject,mode)

      assert.deepEqual(result,expected);
    })
    /**
     * Build RegExp with max option
     */
    it("Min length with mode",function(){
      var specialObject = {
        'pattern' : "[a-zA-Z]",
        'sizeMax' : 20
      }
      var mode = "i"
      var expected = new RegExp("^[a-zA-Z]{0,20}$",mode)

      var result = data.buildRegex(specialObject,mode)

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
      var expected = "Couldn't generate regex because of undefined pattern"

      try {
        var result = data.buildRegex(specialObject,mode)
      } catch (e) {
        assert.deepEqual(e.message,expected);
      }
    })
    /**
     * Pattern is undefined
     */
    it("Pattern is undefined",function(){
      var specialObject = {}
      var mode = "i"
      var expected = "Couldn't generate regex because of undefined pattern"

      try {
        var result = data.buildRegex(specialObject,mode)
      } catch (e) {
        assert.deepEqual(e.message,expected);
      }

    })
  })
})
