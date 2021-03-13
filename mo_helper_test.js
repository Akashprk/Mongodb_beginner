const mongoose = require("mongoose");
const { deleteOne } = require("../app/student");

before((done)=>{
    mongoose.connect("mongodb://localhost/mongotube",{useNewUrlParser:true});
    mongoose.connection
     .once("open",()=>{
         // console.log("Connected")
         done();
     })
     .on("error",error=>{
         console.log("Your Error",error);
     });
});

beforeEach(done =>{mongoose.connection.collections.students.drop(() =>{
    done();
});
});