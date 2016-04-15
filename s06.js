const koa = require('koa');
const app = koa();

const port = process.argv[2];

function responseTime() {
    return function* (next) {
        const startTime = new Date().time;

        yield next;

	const endTime = new Date().time;
	this.set('X-Response-Time', endTime - startTime);
    };
}

function upperCase() {
    return function* (next) {
        yield next;
        this.body = this.body.toUpperCase();
    };
}

app.use(responseTime());
app.use(upperCase());

app.use(function* () {
    this.body = 'hello koa';
});

app.listen(port);
