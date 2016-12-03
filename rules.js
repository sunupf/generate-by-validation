var rules = {
  "alpha" : "[a-zA-Z]",
  "alpha_num": "[a-zA-Z0-9]",
  "alpha_dash": "[a-zA-Z\-]",
  "numeric" : "[0-9]",
  "email" : "^[a-zA-Z][a-zA-Z0-9._-]{1,20}@[a-zA-Z0-9\-]{1,20}[.]([a-z]{2,6}|[a-z]{2,6}[.][a-z]{2,3})"
}

module.exports = rules;
