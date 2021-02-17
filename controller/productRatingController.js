
var product = require('../model/product');

module.exports.getProduct = async(req, res)=>{
try
{
 var sortOrder = parseInt(req.query.sortOrder);

    var getData = await product.aggregate([
        {
            $project:
            {
              _id: 0,
              "productID": "$productID",
              "productDetails": "$productDetails",
              "rating": "$rating",
              "comment":"$comment",
              "commentCount": { $size:"$comment"}
            }
          },
          { 
            $sort: { rating :sortOrder}
          }
    ]);
    res.send({
        "data": getData,
        "status": "",
    })
}
catch(error)
{
    res.send("error")
}
}
