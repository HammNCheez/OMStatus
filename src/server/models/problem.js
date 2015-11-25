'use strict';

//requires

module.exports = function (mongoose, config) {
  var Schema = mongoose.Schema;
  
  var teamSchema = new Schema({
    membership: {type: Schema.Types.ObjectId, ref: 'membership', required: true},
    longTime: {type: Date},
    sponTime: {type: Date},
    statuses: {
      checkedIn: {type:Date},
      performed: {type:Date},
      scoresReady: {type:Date},
      coachPickup: {type:Date},
      scoreRoomPickup: {type:Date},
      scoreRoomAccept: {type:Date}
    }
  });
  
  var venueSchema = new Schema({
    name: {type: String, required: true},
    sortOrder: {type: Number, required: true},
    divisions: {
      divP: [teamSchema],
      div1: [teamSchema],
      div2: [teamSchema],
      div3: [teamSchema],
      div4: [teamSchema]
    }
  });
  
  var problemSchema = new Schema({
    name: {type: String, required: true},
    number: {type: String, enum: ['P', '1', '2', '3', '4', '5'], required: true},
    year: {type: Number, required: true},
    tournament: {type: Schema.Types.ObjectId, ref: 'tournament', required: true},
    venues: [venueSchema],
    createdAt: {type: Date},
    updatedAt: {type: Date}
  }, {versionKey: false});

  problemSchema.pre('validate', function(next){
    this.number = this.number.toUpperCase();    
    next();
  });
  
  problemSchema.pre('save', function(next){
    var currentDate = new Date();

    this.updatedAt = currentDate;
    if(!this.createdAt)
      this.createdAt = currentDate;

    next();
  });
  
  problemSchema.index({tournament: 1, number: 1});

  return mongoose.model('problem', problemSchema)
};