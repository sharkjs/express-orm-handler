module.exports = (name, handler) ->
	uppercased-name = name.0.toUpperCase! + name.slice 1
	handler ?= (req, res) -> req.session"#{name}Id"

	!(req, res, next) ->
		req"get#uppercased-name" = !(cb) ->
			unless id = handler req, res
				res.end!
				return	

			err, model <-! req.models[name]get id
			if err or not model
				res.end!
				return

			cb model

		next!