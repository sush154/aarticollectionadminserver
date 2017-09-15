var express = require('express'),
    categoryMiddleware = express(),
    categoryRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    highlightModel = require('../../model/highlight');

categoryRouter.use(cookieParser());
categoryRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret


categoryRouter.use(function(req, res, next){
	/*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if((req.session.cookie._expires > (new Date())) && req.cookies['token']){
        next();
    } else {
        res.cookie("token", "", { expires: new Date() });
        return res.json({data: {status : 401}});
    }*/next();
});

/*
    This method gets all categories
*/
categoryRouter.get('/getAllCategories', function(req, res, next){
    highlightModel.find({}).exec(function(err, category){
        if(err) return res.json({data:{status : 500}});
        else {
            return res.json({data: {status: 200, category}});
        }
    });
});

/*
    This method add category
*/
categoryRouter.post('/addCategory', function(req, res, next){

    var newCategory = new categoryModel();

    newCategory.type = req.body.type;

    newCategory.save(function(err, category){
        if(err){console.log(err); return res.json({data: {status : 500}});}
        else {
            return res.json({data: {status : 200}});
        }
    });
});


categoryMiddleware.use('/category', categoryRouter);

module.exports = categoryMiddleware;