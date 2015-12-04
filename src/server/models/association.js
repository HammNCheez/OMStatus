'use strict';

//requires

module.exports = function (mongoose, config) {
  var Schema = mongoose.Schema;

  var assocSchema = new Schema({
    name: {type: String, required: true, unique: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
  }, {versionKey: false});

  assocSchema.pre('validate', function(next){
    this.name = this.name.toUpperCase();
    
    next();
  });
  
  assocSchema.pre('save', function(next){
    var currentDate = new Date();

    this.updatedAt = currentDate;
    if(!this.createdAt)
      this.createdAt = currentDate;

    next();
  });
  
  return mongoose.model('assoc', assocSchema)
};