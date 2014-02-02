# expressmount

Simple route mounter for expressjs applications

## expressmount(actions, options)

Returns expressjs Application object.

### `actions`

An object definition of actions in the following form:

    {
      "GET": function(req, res, next) {

      },
      "PUT /path": function(req, res, next) {

      },
      "DELETE /:id": [function(){}, function(){}],
      "POST /uploads": function(){}
    }

### `options`

  * `log` : Boolean, if set will dump mounted routes

## example
    
    // /routes/api.js
    module.exports = {
      "GET /version": function(req, res, next) {
        res.send(process.version)
      }
    }

    // /app.js
    var app = require("express")()
    var api_routes = expressmount(require("./api.js"))

    app.use(api_routes.router)
