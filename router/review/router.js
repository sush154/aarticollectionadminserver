var express = require('express'),
    ReviewMiddleware = express(),
    ReviewRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    ReviewModel = require('../../model/review'),
    DateConverter = require('../../util/dateConverter');


ReviewRouter.use(cookieParser());
ReviewRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret

ReviewRouter.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    /*if((req.session.cookie._expires > (new Date())) && req.cookies['token']){
        next();
    } else {
        res.cookie("token", "", { expires: new Date() });
        return res.json({data: {status : 401}});
    }*/next();
});

/*
*   This method retrieves all the reviews
*/
ReviewRouter.get('/getAllReviews', function(req, res){
    ReviewModel.find({}).populate([{path : 'customer'}, {path : 'product'}]).exec(function(err, review){
        if(err) {console.log(err); return res.json({data:{status : 500}})}
        else {
            return res.json({data: {status: 200, review}});
        }

    });
});


/*
*   This method retrieves user reviews
*/
ReviewRouter.post('/getUserReviews', function(req, res){
    var userId = req.body.userId;

    ReviewModel.find({customer : userId}).populate([{path : 'customer'}, {path : 'product'}]).exec(function(err, review){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data: {status: 200, review}});
        }
    });
});


/*
*   This method retrieves reviews for a particular product
*/
ReviewRouter.post('/getProductReviews', function(req, res) {
    var productId = req.body.productId;

    ReviewModel.find({product : productId}).populate([{path : 'customer'}, {path : 'product'}]).exec(function(err, review){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data: {status: 200, review}});
        }
    });
});


/*
*   This method adds a new review
*/
ReviewRouter.post('/addReview', function(req, res){
    var newReview = new ReviewModel;

    newReview.customer = req.body.userId;
    newReview.reviewDate = DateConverter(req.body.reviewDate);
    newReview.ratings = req.body.ratings;
    newReview.product = req.body.product;

    newReview.save(function(err, review){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data: {status: 200}});
        }
    })
});


ReviewMiddleware.use('/review', ReviewRouter);

module.exports = ReviewMiddleware;