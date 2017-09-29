var express = require('express'),
    CustomerMiddleware = express(),
    CustomerRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    CustomerModel = require('../../model/customer');


CustomerRouter.use(cookieParser());
CustomerRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret


CustomerRouter.use(function(req, res, next){
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
*   This method adds new Customer
*/
CustomerRouter.post('/addCustomer', function(req, res){
    var newCustomer = new CustomerModel;

    newCustomer.firstName = req.body.firstName;
    newCustomer.lastName = req.body.lastName;
    newCustomer.address = req.body.address;
    newCustomer.city = req.body.city;
    newCustomer.state = req.body.state;
    newCustomer.pincode = req.body.pincode;
    newCustomer.email = req.body.email;
    newCustomer.activationFlag = true;

    CustomerModel.findOne({email : req.body.email}, function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            if(!customer){
                newCustomer.save(function(err, customer){
                    if(err){
                        console.log(err);
                        return res.json({data:{status : 500}});
                    }else {
                        return res.json({data: {status : 200}});
                    }
                });
            }else {
                return res.json({data:{status : 201}});
            }
        }
    })


});

/*
*   This method retrieves All Customers
*/
CustomerRouter.get('/getAllCustomers', function(req, res, next){
    CustomerModel.find({}).select('firstName lastName email city').exec(function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data: {status : 200, customer}});
        }
    });
});

/*
*   This method retrieves Customer Details
*/
CustomerRouter.post('/getCustomerDetails', function(req, res){
    CustomerModel.findOne({_id : req.body.customerId}, function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data: {status : 200, customer}});
        }
    });
});

/*
*   This method searches a customer is available or not. If available, sends error code that it is available. If not sends 200
*   This method would be called in new registration or adding duplicate customer
*/
CustomerRouter.get('/searchCustomer/:id', function(req, res){
    var emailID = req.params.id;

    CustomerModel.findOne({email : emailID}, function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            if(customer){
                // Customer found
                return res.json({data:{status : 201}});
            }else {
                // Customer not found
                return res.json({data:{status : 200}});
            }
        }
    });
});


/*
*   This method updates the customer details
*/
CustomerRouter.post('/updateCustomer', function(req, res, next){
    var updatedCustomer = {};

    if(req.body.email !== ''){
        CustomerModel.findOne({email : req.body.email}, function(err, customer){
            if(err){
                console.log(err);
                return res.json({data:{status : 500}});
            }else {
                if(customer){
                    // Customer found
                    return res.json({data:{status : 201}});
                }else {
                    // Customer not found

                }
            }
        });
    }
    if(req.body.firstName !== ''){
        updatedCustomer.firstName = req.body.firstName;
    }

    if(req.body.lastName !== ''){
        updatedCustomer.lastName = req.body.lastName;
    }

    if(req.body.address !== ''){
        updatedCustomer.address = req.body.address;
    }

    if(req.body.email != ''){
        updatedCustomer.email = req.body.email;
    }

    CustomerModel.update({_id : req.body._id}, {$set : updatedCustomer}, function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });


});


/*
*   This method updates password
*/
CustomerRouter.post('/updatePassword', function(req, res){
    var userId = req.cookies['token'].split('-')[1];

    CustomerModel.findOne({_id : userId, password : req.body.currentPassword}, function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            if(customer){
                // Customer Found
                CustomerModel.update({_id : userId}, {'password' : req.body.newPassword}, function(err, customer){
                    if(err){
                        console.log(err);
                        return res.json({data:{status : 500}});
                    }else {
                        return res.json({data:{status : 200}});
                    }
                });
            }else {
                // Customer not found
                return res.json({data:{status : 201}});
            }
        }
    });
});


/*
*   This method updates Logged User Details
*/
CustomerRouter.post('/updateLoggedInUser', function(req, res, next){

    let updatedCustomer = {};

    var userId = req.cookies['token'].split('-')[1];

    if(req.body.email !== ''){
        CustomerModel.findOne({_id : userId}, function(err, customer){
            if(err){
                console.log(err);
                return res.json({data:{status : 500}});
            }else {
                if(customer){
                    // Customer found
                    return res.json({data:{status : 201}});
                }else {
                    // Customer found
                }
            }
        });
    }

    if(req.body.firstName !== ''){
        updatedCustomer.firstName = req.body.firstName;
    }

    if(req.body.lastName !== ''){
        updatedCustomer.lastName = req.body.lastName;
    }

    if(req.body.address !== ''){
        updatedCustomer.address = req.body.address;
    }

    if(req.body.email !== ''){
        updatedCustomer.email = req.body.email;
    }

    CustomerModel.update({_id : userId}, {$set : updatedCustomer}, function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });

});


/*
*   This method deletes selected User
*/
CustomerRouter.post('/deleteCustomer', function(req, res){
    CustomerModel.findByIdAndRemove({_id : req.body._id}, function(err, customer){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });
});



CustomerMiddleware.use('/customer', CustomerRouter);

module.exports = CustomerMiddleware;