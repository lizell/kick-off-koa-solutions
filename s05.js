const koa = require('koa');
const app = koa();

const port = process.argv[2];

app.use(function* (next) {
    if (this.request.is('application/json')) {
	this.body = { message: 'hi!' };
    } else {
	this.body = 'ok';
    }
});

app.listen(port);
