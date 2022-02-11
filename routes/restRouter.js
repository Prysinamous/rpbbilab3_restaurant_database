const express = require('express');
const restModel = require('../models/Restaurant');
const app = express();

//Robbi AD 101236645

//GET ALL RESTAURANTS
//http://localhost:8081/restaurants 
app.get('/restaurants', async (req, res) => {

restaurants = await restModel.find({})

    try {
        res.status(200).send(restaurants);
      } catch (err) {
        res.status(500).send(err);
      }
});

//CREATE A NEW RESTAURANT RECORD
//http://localhost:8081/restaurant
app.post('/restaurant', async (req, res) => {

  console.log(req.body)
  restaurant = await restModel.find({})
  
      try {
        await restaurant.save()
        res.send(restaurant)
        res.status(200).send("Restaurant has been added!");
        } 

        catch (err) {
          console.log("Restaurant WAS NOT ADDED: ERROR" + err)
          res.status(500).send(err);
        }
  });


//GET BY CUISINE
 // http://localhost:3000/restaurants?(specified cuisine) 
 app.get('restaurants/cuisine/:cuisine', async (req, res) => {
  
  const cuisine = req.params.cuisine
  const restaurants = await restModel.getRestByCuisine(cuisine)

try {
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});


//GET ASC ORDER
// http://localhost:3000/restaurants?sortBy=ASC 
app.get('restaurants?sortBy=ASC', async (req, res) => {
  
  restaurants = await restModel.find({}).sort({'restaurant_id' : req.query.sortBy}) //default ascending

try {
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET DESC ORDER
// http://localhost:3000/restaurants?sortBy=DESC 
app.get('restaurants?sortBy=DESC', async (req, res) => {

restaurants = await restaurantModel.find({}).sort({'restaurant_id' : req.query.sortBy.reverse}) //reverseing so its descending

try {
res.status(200).send(restaurants);
} catch (err) {
res.status(500).send(err);
}
});

//GET DESC ORDER
// http://localhost:3000/restaurants/Delicatessen
app.get('restaurants/Delicatessen', async (req, res) => {

  restaurants = await restModel.find({cuisine: 'Delicatessen', city: {$ne: 'Brooklyn'}})
  
  try {
  res.status(200).send(restaurants);
  } catch (err) {
  res.status(500).send(err);
  }
  });

module.exports = app
