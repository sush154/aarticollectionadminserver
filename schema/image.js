var mongoose = require('mongoose');

var ImageSchema = mongoose.Schema({
    imgPath   : String,
    projectId : String,
	imgFor	:	String 		//This tag keeps track why image for. - productImg, homeCorousel
});

module.exports = ImageSchema;