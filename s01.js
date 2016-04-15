const koa = require('koa');
const app = koa();

const port = process.argv[2];

app.use(function *() {
    this.body = 'hello koa';
});

app.listen(port);
