const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://foodmern:aman123@cluster0.qzqokvv.mongodb.net/gomernfood?retryWrites=true&w=majority";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to mongo");
    // Food items fetching
    const fetched_data = await mongoose.connection.db.collection("food_items_data");
    const data = await fetched_data.find({}).toArray();
    // Food Category fetching
    const foodCategory = await mongoose.connection.db.collection("food_items");
    const Category_data = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.food_Category = Category_data;
  } 
  catch (err) {
    console.error(err);
  }
};

module.exports = mongoDB;
