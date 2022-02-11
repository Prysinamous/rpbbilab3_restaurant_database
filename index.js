const express = require('express');
const mongoose = require('mongoose');
const restRouter = require('./routes/restRouter.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://robbi:Panchitoisfat12@assignment2db.znhee.mongodb.net/wk4?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});


app.use(employeeRouter);

app.listen(8081, () => { console.log('Server is running...') });
