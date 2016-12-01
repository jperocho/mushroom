'use strict';
var ApiRoute     = require('express').Router();
var db           = require('../db');
var conf = require('../config');

var EndpointSchema = require('../models/endpoint');
ApiRoute

	.get('/:resources', (req, res) => {
		console.log(req.params.resources);

		var endpoints = EndpointSchema.find({slug:req.params.resources}).exec();

		endpoints
			.then((endpoint) => {
				if (endpoint.length) {
					db.collection(req.params.resources)
						.find({},{_id:0})
						.toArray( (err,resource) => {
								if (err)
									console.log(err);

								res.json({result:resource});
							})
				} else {
					res.status(404).json({error: conf.error['404'].status, message: conf.error['404'].apiMessage});
				}
			})
			.catch( e => {
				res.status(500).json({error: conf.error['500'].status, message: conf.error['500'].apiMessage});
			})

	})

	.post('/:resources', (req, res) => {
		var endpoints = EndpointSchema.find({slug:req.params.resources}).exec();

		endpoints
			.then( endpoint => {
				if (!endpoint.length)
					res.status(404).json({error: conf.error['404'].status, message: conf.error['404'].apiMessage});

				return endpoint[0].fields;

			})
			.then( fields => {

				var resource = {};

				for (var key in req.body) {
					if (fields.filter((m) => m[key])[0]) {
						resource[key] = req.body[key];
					}
				}

				return resource;
			})
			.then( resource => {
				db.collection(req.params.resources)
					.insert(resource)
					.then(function(err, docs) {
						res.json(docs);
					})

			})
			.catch( e => {
				res.status(500).json({error: conf.error['500'].status, message: conf.error['500'].apiMessage});
			})



	})

module.exports = ApiRoute;