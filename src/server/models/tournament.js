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
	location: {
		name: {type: String},
		address: {
			street: {type: String},
			city: {type: String},
			state: {type: String},
			zip: {type: String}
		}
	},
	createdAt: {type: Date},
	updatedAt: {type: Date}
  }, {versionKey: false});
  
  tournamentSchema.pre('save', function(next){
	  var currentDate = new Date();
	  
	  this.updatedAt = currentDate;
	  if(!this.createdAt)
	  	this.createdAt = currentDate;
  });
  
  return mongoose.model('tournament', tournamentSchema)
};