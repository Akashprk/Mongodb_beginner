const Student = require("../app/student");
const assert = require("assert");
const { read } = require("fs");

describe("Create test",()=>{
   it("create a user in DB",()=>{
      // assert(false);
      const sam = new Student({name:"Sam"});
      sam.save()
         .then(()=>{
             assert(!sam.isNew);
         })
         .catch(()=>{
             console.log("error");
         })
   })
});

// All read test

describe("Read Tests" , ()=>{
    let reader;
    beforeEach(done =>{
        reader = Student({name:"Reader"});
        reader.save().then(()=>{
            done();
        });
    });

    it("Read a user:Reader",done=>{
        Student.find({name:"Reader"}).then(students=>{
            // id is a Bson value

            assert(reader._id.toString()===students[0]._id.toString());
            done();
        });
    });
});

//All delete test 

describe("Delete Tests",()=>{
    let delter;
    
    beforeEach(done =>{
        delter = new Student({name:"Deleter"});
        delter.save().then(()=>done());
    });

    it("A delete test for delter",done=>{
        Student.findByIdAndDelete(delter._id)
        .then(()=>Student.findOne({name:"Deleter"}))
        .then(student=>{
            assert(student ===null);
            done();
        });
    });
});

// all update test

describe("Update Tests",()=>{
    let updater; 
     beforeEach((done)=>{
         updater = new Student({name:'Updater'})
         updater.save()
         .then(()=>done())
     });
     it('set n Save test',(()=>{
         updater.set('name',"UpUpdater");
         updater
         .save()
         .then(()=>Student.find({}))
         .then(students=>{
             assert(students[0].name !=="Updater");
             assert(students[0].name ==="Updater");
         });
     }));
});