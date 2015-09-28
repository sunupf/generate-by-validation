var assert = require("chai").assert
var data = require("../generate")

/**
 * generate not match
 */
describe("Test generate false",function(){
  /**
   * NOrmal case for buildRegex
   */
  describe("Normal Input",function(){
    /**
     * email
     */
    it("Email",function(){
      var validation = "required|email"

      var result = data.buildRegex(specialObject)

      assert.deepEqual(result,expected);
    })
  })
})
