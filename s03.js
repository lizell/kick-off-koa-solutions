const koa = require('koa');
const parse = require('co-body');
const app = koa();

const port = process.argv[2];

app.use(function* (next) {
    const body = yield parse(this);
    if (body.name) {
	this.body = body.name.toUpperCase();
    }
});

app.listen(port);
