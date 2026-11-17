use("collegeDB");
db.Students2.aggregate([
    {
        $match: {
          course:"BTech",
          city:"GGN"
        }
    },
    {
        $project: {
          name:1,
          age:1,
          sem:1,
          course:1,
          fees:1

        }
    },
    {
        $group: {
          _id: "$sem",
          totalmarks:{$sum:"$fees"},
          avgmarks:{$avg:"$fees"},
          maxmarks:{$max:"$fees"},
          minmarks:{$min:"$fees"}
        }
    },
    {
        $sort: {
          _id:1
        }
    }
])