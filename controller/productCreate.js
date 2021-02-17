
var product = require('../model/product');
var user = require('../models/user')

module.exports.createProduct = async(req, res)=>{
try
{
    let findUser = await user.findOne({ _id: ObjectId(req.payload._id)});
    if(findUser && findUser.userType){
        if( findUser.userType ==="SuperUser")
        {
            await CompanyWisePageData.insertMany(
                [
                  {
                    productID: req.body.productID,
                    productDetails: req.body.productDetails,
                    rating: req.body.rating,
                    comment:  req.body.comment,
                  },
                ]
              );
        }
        else 
        res.send("you dont have permission to create")
    }
    res.send("data inserted successfully")
}
catch(error)
{
    res.send("error")
}
}
