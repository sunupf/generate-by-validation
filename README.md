# generate-by-validation
Generate data based on validation. we can generate valid data and invalid data so we can use it for our functional test activity

I'm using https://github.com/fent/randexp.js to generate the data

# Installation
  ```javascript
  npm install generate-by-validation
  ```
  
# Usage
First include the module to your project
  ```javascript
  var data = require('gen-by-validation');
  ```
For example you want generate name with minimal length = 5 and maximal length = 10
  ```javascript
  var name = data.generate(['required','min:5','max:10'])
  console.log(name)
  //will output something like : 'SnDueGq-IG' =>length beetwen 5-10 
  ```

If you want generate data which not match with name, min:5, and max:10 you can set second parameter to false
  ```javascript
  var name = data.generate(['required','min:5','max:10'],false)
  console.log(name)
  //will output something like : '/,!/"474]5{$*\'/6~,8\'\'*%}!' => length more than 10
  ```

The result is random that's why the result ussually unpronounceable 

# Supported validation rule

- alpha : a-z
- min:x
- max:y
- between:x,y
- exact:x

