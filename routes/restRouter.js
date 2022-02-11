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
  const restaurant = new restModel(req.body)
  
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

restaurants = await restModel.find({}).sort({'restaurant_id' : req.query.sortBy.reverse}) //reverseing so its descending

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


app.get('/seed', async (req, res) => {
  try {
      await restModel.remove({})
      await restModel.insertMany(
          [{
            "address": {
              "building": "1008",
              "street": "Morris Park Ave",
              "zipcode": "10462"
           },
           "city": "Bronx",
           "cuisine": "Bakery",
           "name": "Morris Park Bake Shop",
           "restaurant_id": "30075445"
          },
          {
            "address": {
              "street": "Thai Son Street",
              "zipcode": null
           },
           "city": "Manhattan",
           "cuisine": "Vietnamese",
           "name": "Pho Me Long Time",
           "restaurant_id": "30075455"
          },
          {
            "address": {
              "building": "253",
              "street": "East 167 Street",
              "zipcode": null
           },
           "city": "Bronx",
           "cuisine": "Chicken",
           "name": "Mom's Fried Chicken",
           "restaurant_id": "40382900"
          },
          {
            "address": {
              "building": "120",
              "street": "East 56 Street",
              "zipcode": "19800"
           },
           "city": "Mahattan",
           "cuisine": "Italian",
           "name": "Montebello Restaurant",
           "restaurant_id": "40397082"
          },
          {
            "address": {
              "building": "195",
              "street": "Soprano Street",
              "zipcode": "17500"
           },
           "city": "Staten Island",
           "cuisine": "Hamburgers",
           "name": "Joeys Burgers",
           "restaurant_id": "40397555"
          },
          {
            "address": {
              "building": "200",
              "street": "Queens Boulevard",
              "zipcode": "19700"
           },
           "city": "Queens",
           "cuisine": "American",
           "name": "Brunos on the Boulevard",
           "restaurant_id": "40397678"
          },
          {
            "address": {
              "building": "555",
              "street": "Sushi Street",
              "zipcode": "17700"
           },
           "city": "Brooklyn",
           "cuisine": "Japanese",
           "name": "Iron Chef House",
           "restaurant_id": "40397699"
          },
          {
            "address": {
              "building": "555",
              "street": "Fontana Street",
              "zipcode": null
           },
           "city": "Brooklyn",
           "cuisine": "Japanese",
           "name": "Wasabi Sushi",
           "restaurant_id": "40398000"
          },
          {
            "address": {
              "building": "900",
              "street": "Goodfellas Street",
              "zipcode": "17788"
           },
           "city": "Brooklyn",
           "cuisine": "Delicatessen",
           "name": "Sal's Deli",
           "restaurant_id": "40898000"
          },
          {
            "address": {
              "building": "909",
              "street": "44 Gangster Way",
              "zipcode": "17988"
           },
           "city": "Queens",
           "cuisine": "Delicatessen",
           "name": "Big Tony's Sandwich Buffet",
           "restaurant_id": "40898554"
          },
          {
            "address": {
              "building": "1201",
              "street": "121 Canolli Way",
              "zipcode": "17989"
           },
           "city": "Queens",
           "cuisine": "Delicatessen",
           "name": "The Godfather Panini Express",
           "restaurant_id": "40898554"
          }]
      )

      res.send(await restModel.find({}))
  } catch (err) {
      res.status(500).send({error: err.toString()})
  }
})


restModel.insertMany(
  [{
    "address": {
      "building": "1008",
      "street": "Morris Park Ave",
      "zipcode": "10462"
   },
   "city": "Bronx",
   "cuisine": "Bakery",
   "name": "Morris Park Bake Shop",
   "restaurant_id": "30075445"
  },
  {
    "address": {
      "street": "Thai Son Street",
      "zipcode": null
   },
   "city": "Manhattan",
   "cuisine": "Vietnamese",
   "name": "Pho Me Long Time",
   "restaurant_id": "30075455"
  },
  {
    "address": {
      "building": "253",
      "street": "East 167 Street",
      "zipcode": null
   },
   "city": "Bronx",
   "cuisine": "Chicken",
   "name": "Mom's Fried Chicken",
   "restaurant_id": "40382900"
  },
  {
    "address": {
      "building": "120",
      "street": "East 56 Street",
      "zipcode": "19800"
   },
   "city": "Mahattan",
   "cuisine": "Italian",
   "name": "Montebello Restaurant",
   "restaurant_id": "40397082"
  },
  {
    "address": {
      "building": "195",
      "street": "Soprano Street",
      "zipcode": "17500"
   },
   "city": "Staten Island",
   "cuisine": "Hamburgers",
   "name": "Joeys Burgers",
   "restaurant_id": "40397555"
  },
  {
    "address": {
      "building": "200",
      "street": "Queens Boulevard",
      "zipcode": "19700"
   },
   "city": "Queens",
   "cuisine": "American",
   "name": "Brunos on the Boulevard",
   "restaurant_id": "40397678"
  },
  {
    "address": {
      "building": "555",
      "street": "Sushi Street",
      "zipcode": "17700"
   },
   "city": "Brooklyn",
   "cuisine": "Japanese",
   "name": "Iron Chef House",
   "restaurant_id": "40397699"
  },
  {
    "address": {
      "building": "555",
      "street": "Fontana Street",
      "zipcode": null
   },
   "city": "Brooklyn",
   "cuisine": "Japanese",
   "name": "Wasabi Sushi",
   "restaurant_id": "40398000"
  },
  {
    "address": {
      "building": "900",
      "street": "Goodfellas Street",
      "zipcode": "17788"
   },
   "city": "Brooklyn",
   "cuisine": "Delicatessen",
   "name": "Sal's Deli",
   "restaurant_id": "40898000"
  },
  {
    "address": {
      "building": "909",
      "street": "44 Gangster Way",
      "zipcode": "17988"
   },
   "city": "Queens",
   "cuisine": "Delicatessen",
   "name": "Big Tony's Sandwich Buffet",
   "restaurant_id": "40898554"
  },
  {
    "address": {
      "building": "1201",
      "street": "121 Canolli Way",
      "zipcode": "17989"
   },
   "city": "Queens",
   "cuisine": "Delicatessen",
   "name": "The Godfather Panini Express",
   "restaurant_id": "40898554"
  }]
)


module.exports = app
