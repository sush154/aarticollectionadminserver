var config = {
		mongo : {
			//connectionUrl : 'mongodb://admin:admin@ds163053.mlab.com:63053/aartiscollection'
			connectionUrl : 'mongodb://localhost:27017/aartiscollection'
		},
		mongooseConnection : null,
		client : {
			connectionUrl : 'http://localhost:3000'
		}
}

module.exports = config;