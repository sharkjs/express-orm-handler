module.exports = function(name, handler){
  var uppercasedName;
  uppercasedName = name[0].toUpperCase() + name.slice(1);
  handler == null && (handler = function(req, res){
    return req.session[name + "Id"];
  });
  return function(req, res, next){
    req["get" + uppercasedName] = function(cb){
      var id;
      if (!(id = handler(req, res))) {
        res.end();
        return;
      }
      req.models[name].get(id, function(err, model){
        if (err || !model) {
          res.end();
          return;
        }
        cb(model);
      });
    };
    next();
  };
};