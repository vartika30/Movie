const mongoos = require("mongoose");
const carSchema = new mongoos.Schema({
    modal:String,
    releaseYear:Number,
    make:String,
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;