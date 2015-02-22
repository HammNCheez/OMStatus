/**
 * RoleController
 *
 * @description :: Server-side logic for managing Roles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getRoles: function(req, res) {
		Role.find().exec(function(err, roles) {
			if(err) return next(err);

			res.json(roles);
		})
	}
};

