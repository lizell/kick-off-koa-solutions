const koa = require('koa');
const app = koa();

const port = process.argv[2];

function errorHandler() {
    return function* (next) {
	try {
	    yield* next;
	} catch (error) {
	    this.status = 500;
	    this.body = 'internal server error';
	}
    };
}

app.use(errorHandler());

app.use(function* () {
    if (this.path === '/error') throw new Error('ooops');
    this.body = 'OK';
});

app.listen(process.argv[2]);

