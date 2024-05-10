const mongoose = require('mongoose');
const State = require('./States');
const statesData = require('./states.json');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function populateStates() {
  try {
    await State.deleteMany(); // Clear existing data
    await State.insertMany(statesData);
    console.log('States data populated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating states data:', error);
    process.exit(1);
  }
}

populateStates();
