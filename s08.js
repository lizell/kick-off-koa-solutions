const koa = require('koa');
const app = koa();
app.keys = ['secret', 'keys'];

const port = process.argv[2];
const cookieName = 'view';
const signed = { signed: true };

app.use(function* () {
    const views = this.cookies.get(cookieName, signed) || 1;
    this.cookies.set(cookieName, views + 1, signed);
    this.body = `${views} views`;
});

app.listen(process.argv[2]);
