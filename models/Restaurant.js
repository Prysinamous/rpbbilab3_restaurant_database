const mongoose = require('mongoose');
//Robbi AD 101236645

const AddressSchema = new mongoose.Schema({
  building: Number,
  street: String,
  zipcode: Number
})

const RestSchema = new mongoose.Schema({

  address: {
    type: AddressSchema,
    required: true
},
city: {
    type: String,
    required: true
},
cuisine: {
    type: String,
    required: true
},
name: {
    type: String,
    required: true,
},
restaurant_id:{
    type: Number,
    requied: true
}
});


//Custom Schema Methods

RestSchema.static("getRestByCuisine", function(value)
{
    return this.find({cuisine: value})
})

// Middleware POST
RestSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

RestSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

RestSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

RestSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

// Create Model
const Restaurant = mongoose.model("Restaurant", RestSchema);
module.exports = Restaurant