var express = require("express")

var mountAction = function(app, method, url, action, options) {
  if(!url)
    url = "/";
  if(options && options.log)
    console.log("http", method, url)
  if(method == "*")
    app.all(url, action);
  else
  if(method == "DELETE")
    app.del(url, action);
  else
    app[method.toLowerCase()](url, action);
}

module.exports = function(actions, options) {
  var app = express()
  for(var key in actions) {
    var parts = key.split(" ");
    var method = parts.shift();
    var url = parts.pop();
    var actionHandler = actions[key];
    if(typeof actionHandler === "string") {
      actionHandler = actions[actionHandler];
      if(typeof actionHandler !== "function" && !Array.isArray(actionHandler))
        throw new Error(actionHandler+" was not found");
    }

    mountAction(app, method, url, actionHandler, options);
  }
  return app
}