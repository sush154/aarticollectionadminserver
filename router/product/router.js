var express = require('express'),
    productMiddleware = express(),
    productRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    productModel = require('../../model/product');

productRouter.use(cookieParser());
productRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret


/*productRouter.use(function(req, res, next){
	/*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if((req.session.cookie._expires > (new Date())) && req.cookies['token']){
        next();
    } else {
        res.cookie("token", "", { expires: new Date() });
        return res.json({data: {status : 401}});
    }
});*/



/**
 * The method populates all the products for admin user
 */
productRouter.get('/getAllProducts', function(req, res){

    productModel.find({}, 'productId productName category quantity' , function(err, product){
        if(err) return res.json({data:{status : 500}});
        //return res.json({data: {status: 200, product}});
        else {
            return res.json({data: {status: 200, product}});
        }
    });
});


/**
 * The method adds new product
 */
productRouter.post('/addProduct', function(req, res){
    var newProduct = new productModel;

    newProduct.productName = req.body.productName;
    newProduct.category = req.body.category;
    newProduct.rating = req.body.rating;
    newProduct.price = req.body.price;

    if(req.body.discount !== undefined && req.body.discount != ''){
        newProduct.discount = req.body.discount;
    }

    newProduct.quantity = req.body.quantity;
    newProduct.color = req.body.color;
    newProduct.description = req.body.description;


    newProduct.save(function(err, product){
        if(err){console.log(err); return res.json({data: {status : 500}});}
        else {
            // Add highlights to the product
            console.log(req.body.highlights);
            for(let i=0; i<req.body.highlights.length; i++){
                console.log(req.body.highlights[i]);
                productModel.update({_id : product._id}, {'$push' : {'highlights' : req.body.highlights[i]}}, function(err, updatedProduct){
                    if(err) {return res.json({data: {status : 500}});}
                    else {
                        //return res.json({data: {status : 200}});

                    }
                });
            }

            return res.json({data: {status : 200}});
        }
    });
});


/**
  * The method populates data for selected Project ID
  */
productRouter.get('/getProductDetails/:id', function(req, res){
    var productID = req.params.id;
    console.log(productID);
    productModel.findOne({productId : productID}).populate('reviews').exec(function(err, product){
        if(err) {console.log(err); return res.json({data: {status : 500}});}
        else{
            return res.json({data: {status : 200, product}});
        }
    });
});


/**
 *  This method populates only Product Names.
 */
productRouter.get('/getProductNames', function(req, res){
    productModel.find({}).select('productName').exec(function(err, product){
        if(err) return res.json({data:{status : 500}});
        return res.json({data: {status: 200, product}});
    });
});


/**
 *  This method updates the product details
 */
productRouter.post('/updateProduct', function(req, res){
    var productUpdates = {};

    if(req.body.productName !== ''){
        productUpdates.productName = req.body.productName;
    }

    if(req.body.category !== ''){
        productUpdates.category = req.body.category;
    }

    if(req.body.price !== ''){
        productUpdates.price = req.body.price;
    }

    if(req.body.discount !== ''){
        productUpdates.discount = req.body.discount;
    }

    if(req.body.quantity !== ''){
        productUpdates.quantity = req.body.quantity;
    }

    if(req.body.color !== ''){
        productUpdates.color = req.body.color;
    }

    if(req.body.description !== ''){
        productUpdates.description = req.body.description;
    }

});

/**
  * This method adds images urls for product
  */
productRouter.post('/addimages', function(req, res){
    productModel.update({_id : req.body._id}, {'$push' : {'images' : req.body.image}}, function(err, product){
        if(err) {return res.json({data: {status : 500}});}
        else {
            return res.json({data: {status : 200}});
        }
    });
});




productMiddleware.use('/product', productRouter);

module.exports = productMiddleware;