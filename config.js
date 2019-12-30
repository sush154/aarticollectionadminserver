var allowedOrigins = ['http://localhost:3000', 'http://localhost:8100'];


var config = {
		mongo : {
			connectionUrl : 'mongodb+srv://sush154:Dhundi63@cluster0-phx5x.mongodb.net/test?retryWrites=true&w=majority'
			// connectionUrl : 'mongodb://localhost:27017/aartiscollection'
		},
		mongooseConnection : null,
		client : {
			connectionUrl : ['http://localhost:3000', 'http://localhost:8100', 
			'https://aarticollectionadminui.herokuapp.com/', 'http://localhost:4200']
		}
}

module.exports = config;