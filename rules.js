var rules = {
  "alpha" : "[a-zA-Z]",
  "^alpha" : "[^a-zA-Z]",
  "alpha_num": "[a-zA-Z0-9]",
  "^alpha_num": "[^a-zA-Z0-9]",
  "alpha_dash": "[a-zA-Z\-]",
  "^alpha_dash": "[^a-zA-Z\-]",
  "numeric" : "[0-9]",
  "^numeric" : "[^0-9]",
  "email" : "^[a-z][a-z0-9]{1,20}@[a-z]{1,15}[.]([a-z]{2,6}|[a-z]{2,6}[.][a-z]{2,3})",
  "^email" : "[^a-zA-Z0-9._-]",
  // "unique" : require("....")
}

module.exports = rules;
