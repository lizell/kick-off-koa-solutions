const koa = require('koa');
const session = require('koa-session');
const app = koa();
app.keys = ['secret', 'keys'];

const port = process.argv[2];

app.use(session(app));

app.use(function* () {
    const views = this.session.views || 1;
    this.body = `${views} views`;
    this.session.views = ++views;
});

app.listen(process.argv[2]);
