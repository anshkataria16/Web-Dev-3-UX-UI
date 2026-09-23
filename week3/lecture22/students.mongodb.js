use("collegeDB");

// db.createCollection("Students2");

// db.Students2.insert([
//     {
//         name:"Mayank",
//         age:21,
//         city:"GGN",
//         sem:3,
//         course:"BTech",
//         fees:270000
//     },
//     {
//         name:"Ansh",
//         age:18,
//         city:"GGN",
//         sem:3,
//         course:"BTech",
//         fees:270000
//     },
//     {
//         name:"Daksh",
//         age:18,
//         city:"Rewari",
//         sem:3,
//         course:"BCA",
//         fees:200000
//     }
// ])
// db.Students2.find({city:"GGN"})

// db.Students2.find({age:{$gt:18}})
// db.Students2.find({city:"GGN",age:{$lt:21}})
// db.Students2.find({$or:[{city:"GGN"},{age:{$lt:21}}]})
// db.Students2.find({},{name:1,sem:1,_id:0}) //jo 0=> vo show nhi hoga
//sirf 1 wala show hoga
// db.Students2.find().sort({age:-1}) //use to sort the document in ascending odr descending
//1 means ascending and -1 means descending
// db.Students2.find().limit(2) // top 2 document show honge

// db.Students2.find().skip(1).limit(2) //first wala skip hojayega or kyuki limit 2 ki toh 2nd wala document hi show hoga

//students find where semester3 ya uska course btech ho or usko sort krna descending by his marks and limit it to 2 by skip 1 value
db.Students2.find({$or:[{sem:3},{course:"btech"}]}).sort({marks:-1}).skip(1).limit(2)