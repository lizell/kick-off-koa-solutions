const koa = require('koa');
const fs = require('fs');
const app = koa();

const port = process.argv[2];
const file = process.argv[3];

app.use(function* (next) {
    if (this.path === '/json') {
	this.body = { foo: 'bar' };
    } else if ( this.path === '/stream') {
	this.body = fs.createReadStream(file);
    }
});

app.listen(port);
