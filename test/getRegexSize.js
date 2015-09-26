var assert = require("chai").assert
var data = require("../generate")

describe("Test getRegexSize",function(){
  /**
   * Normal Case Special Object
   */
  describe("Normal Input",function(){
    /**
     * Min and Max Provided
     */
    it("Should be return string {min,max}",function(){
      var specialObject = {
        'sizeMin' : 8,
        'sizeMax' : 20
      }
      var expected = [8,20]

      var result = data.getRegexSize(specialObject)

      assert.deepEqual(result,expected);
    })
    /**
     * Just Minimal value provided
     */
    it("Should be return string {min}",function(){
      var specialObject = {
        'sizeMin' : 8
      }
      var expected = [8]

      var result = data.getRegexSize(specialObject)

      assert.deepEqual(result,expected);
    })
    /**
     * Just maximal value provided
     */
    it("Should be return string {0,max}",function(){
      var specialObject = {
        'sizeMax' : 8
      }
      var expected = [0,8]

      var result = data.getRegexSize(specialObject)

      assert.deepEqual(result,expected);
    })
  })
  /**
   * Falsey Input
   */
  describe("Falsey Input",function(){
    /**
     * Min Max value less than zero
     */
    describe("Min/Max value less than zero",function(){
      /**
       * Min value less than zero
       */
      it("Minimal value less than zero",function(){
        var specialObject = {
          'sizeMin' : -1
        }
        // var expected = "Minimal size is less than zero"
        var expected = []

        var result = data.getRegexSize(specialObject)

        assert.deepEqual(result,expected);
      })
      /**
       * Max value less than zero
       */
      it("Maximal value less than zero",function(){
        var specialObject = {
          'sizeMax' : -1
        }
        // var expected = "Maximal size is less than zero"
        var expected = []

        var result = data.getRegexSize(specialObject)

        assert.deepEqual(result,expected);
      })
      /**
       * Min or Max value is undefined
       */
      it("Minimal or Maximal value is undefined",function(){
        var specialObject = {}
        // var expected = "Minimal or Maximal size is undefined"
        var expected = []

        var result = data.getRegexSize(specialObject)

        assert.deepEqual(result,expected);
      })
    })
    /**
     * Min Max value is not a number
     */
    describe("Min/Max value is not a number",function(){
      /**
       * Min value less than zero
       */
      it("Minimal is not a number",function(){
        var specialObject = {
          'sizeMin' : "a"
        }
        // var expected = "Minimal size is not a number"
        var expected = []
        var result = data.getRegexSize(specialObject)
        assert.deepEqual(result,expected);

        var specialObject = {
          'sizeMin' : "a",
          'sizeMax' : 1
        }
        // var expected = "Minimal size is not a number"
        var expected = []
        var result = data.getRegexSize(specialObject)
        assert.deepEqual(result,expected);
      })
      /**
       * Max value is not a number
       */
      it("Maximal value is not a number",function(){
        var specialObject = {
          'sizeMax' : "b"
        }
        // var expected = "Maximal size is not a number"
        var expected = []
        var result = data.getRegexSize(specialObject)
        assert.deepEqual(result,expected);

        // var specialObject = {
        //   'sizeMin' : 1,
        //   'sizeMax' : "b"
        // }
        // var expected = "Maximal size is not a number"
        // var result = data.getRegexSize(specialObject)
        // assert.deepEqual(result.message,expected);
      })
      /**
       * Min or Max value is not a number
       */
      it("Minimal or Maximal value is not a number",function(){
        var specialObject = {
          'sizeMin' : "a",
          'sizeMax' : "b"
        }
        // var expected = "Minimal and Maximal size is not a number"
        var expected = []

        var result = data.getRegexSize(specialObject)

        assert.deepEqual(result,expected);
      })
    })
  })
})
