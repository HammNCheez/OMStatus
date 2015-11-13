'use strict';

//requires

module.exports = function (mongoose, config) {
  var Schema = mongoose.Schema;

  var tournamentSchema = new Schema({
	name: {type: String, required: true},
	assoc: {type: String, required: true},
	level: {type: Number, required: true},
	date: {type: Date, required: true},
	year: {type: Number, required: true},
	location: {type: String, required: true}
  }, {versionKey: false});
  
  return mongoose.model('tournament', tournamentSchema)
};