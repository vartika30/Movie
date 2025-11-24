const mongoos = require("mongoose");

const StudentSchema = new mongoos.Schema({
    studentRegistratioNumber : String,
    studentId: String,
    studentName : String,
    fatherGuardianName: String,
    class: String,
    emergencyContact : Number,
    studentProfileImageUrl : String,

})

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;