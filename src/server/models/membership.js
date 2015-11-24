'use strict';

//requires

module.exports = function (mongoose, config) {
  var Schema = mongoose.Schema;

  var membershipSchema = new Schema({
    name: {type: String, required: true},
    number: {type: String, required: true},
    division: { type: String, enum: ['P', '1', '2', '3', '4'], required: true },
    assoc: {type: String, required: true},
    year: {type: Number, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
  }, {versionKey: false});

  membershipSchema.pre('validate', function(next){
    this.division = this.division.toUpperCase();
    this.assoc = this.assoc.toUpperCase();
    
    next();
  });
  
  membershipSchema.pre('save', function(next){
    var currentDate = new Date();

    this.updatedAt = currentDate;
    if(!this.createdAt)
      this.createdAt = currentDate;

    next();
  });

  return mongoose.model('membership', membershipSchema)
};