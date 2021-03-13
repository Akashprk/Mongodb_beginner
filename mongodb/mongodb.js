// commands to connect

1 --> mongod 

2 --> mongo --host localhost:27017

3 --> use collection 


use _db_name__

db._db_name__createCollection("Students")

db._collection_name.drop();

db.stuents.insertOne({name: "Ali",major:"physics",gpa:3.5})
db.students.insertOne({_id:2, name:"elon",major:"tesla",gpa:4.2,awards:["bst car", "electric world"]})
db.students.insertOne({
    name:"Akash",
    major:"computer science",
    gpa:3.6,
    contact:{phone:"333-3333",email:"student@gmail.com"},
    grades:[81,42,43,98,98]

})

db.students.insertOne({
    name:"mike",
    major:"coding",
    gpa:4.3,
    startdate:("2021-11-31")
})


db.students.insertMany([
    {name:"jack",major:"IT",gpa:4.1},
    {name:"jeff",major:"Marketing",gpa:3.8,awards:["top_most_billionare","world-largest-online-directery"]}
])

db.students.find({})

db.students.find({},{_id:0})

db.students.find({},{_id:0}).limit(3)
// 1 for asscending and -1 for descending
db.students.find({},{_id:0}).sort({name:1,gpa:-1})

db.students.find({major:"coding"},{_id:0})

// work as and operator
db.students.find({major:"coding",name:"mike"},{_id:0})


// or operator

db.students.find({$or:[{major:"tesla"},{name:"Akash"}]},{_id:0})

db.students.find({gpa:{$gt:3.5}},{_id:0})


// $eq, $ne, $lt , $lte, $gt , $gte

db.students.find({gpa:{$lte:4.2}},{_id:0}).sort({gpa:-1})

//$in , $nin

db.students.find({name:{$in:["Akash","elon"]}},{_id:0})

// remove case sensitive 

db.students.find({name:{$in:["akash","ELON"]}},{_id:0}).collation({locale:"en",strength:2})

// $exists

db.students.find({awards:{$exists:true}},{_id:0})

// number type for bson

db.students.find({name:{$type:2}},{_id:0})

db.students.find({"grades.4":98},{_id:0})

db.students.find({grades:{$elemMatch:{$gte:80}}},{_id:0})

db.students.find({grades:{$size:5}},{_id:0})


db.students.updateOne({major:"tesla"},{
    $set:{
        major:"electric-car"
    }
})

db.students.updateMany({major:"electric-car"},{
    $set:{
        major:"tesla"
    }
})

db.students.replaceOne({major:"coding"},
{ name:"new name",major:"new major",gpa:5.0})


db.students.deleteMany({gpa:{$gte:4.1}})

// bulk write

db.students.bulkWrite([
    {insterOne:{
        "document":{name:"Andrew",major:"Architecture",gpa:4.3}
    }},
    {insertOne:{
        "document":{name:"terry",major:"Math",gpa:4.9}}
    },
    {
        updateOne:{
        filter:{name:"jeff"},
        update:{$set:{gpa:5.0}}
    }},
    {deleteOne:
        {
        filter:{name:"Akash"}
    }},
    {replaceOne:{
        filter:{ name:"terry"},
        replacement:{name:"Genny",major:"coding",gpa:3.3}
    }}
])


// text indexing

db.stores.insertMany([
    {_id:1, name:"Java Hut",description:"coffee and cakes"},
    {_id:2,name:"Burger Buns",description:"Gourmet hamburgers"},
    {_id:3,name:"Coffee Shops",description:"Just coffee"},
    {_id:4,name:"Java Shopping",description:"Indian goods"}
])

db.stores.createIndex({name:"text",description:"text"})


db.stores.find({$text:{$search:"coffee"}})

db.stores.find({$text:{$search:"java hut coffee"}},{
    score:{$meta:"textScore"}
})

db.stores.find({$text:{$search:"java hut coffee"}},{
    score:{$meta:"textScore"}
}).sort({score:{$meta:"textScore"}})



// aggregation

db.purchase_orders.insertMany([
    {product:"toothbrush",total:4.75,customer:"Mike"},
    {product:"guitar",total:199.99,customer:"Tom"},
    {product:"milk",total:11.33,customer:"Mike"},
    {product:"pizza",total:8.50,customer:"karen"},
    {product:"toothbursh",total:4.75,customer:"karen"},
    {product:"pizza",total:4.75,customer:"Dave"},
    {product:"toothbursh",total:4.75,customer:"Mike"},
])


db.purchase_orders.count({product: "toothbrush"})

db.purchase_orders.distinct("product")

db.purchase_orders.aggregate([
    {$match:{}},
    {$group:{_id:"$customer",total:{$sum:"$total"}}}
])

db.purchase_orders.aggregate([
    {$match:{customer:{$in:["Mike","karen"]}}},
    {$group:{_id:"$customer",total:{$sum:"$total"}}},
    {$sort:{total:-1}}
])


db.helloworld.insert({
    "speech":"hello-world"

});
cur=db.find();
x=cur.next();
print(x["speech"]);


cur = db.world.find();x=cur.next();print(x["speech"]);
