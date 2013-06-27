module.exports = function(name, handler){
  handler == null && (handler = function(req, res){
    return req.session[name + "-id"];
  });
  return function(req, res, next){
    req["get-" + name] = function(cb){
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