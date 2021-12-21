const jsonServer=require('json-server'),
	path=require('path')
	server=jsonServer.create(),
		router=jsonServer.router(path.join(__dirname,'app/db/db.json')),
	middlewares=jsonServer.defaults();

 
	server.use(middlewares)
	server.use(router)
	server.listen(3003,() => {
		console.log('JSON Server is running')
	})
