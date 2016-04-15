const koa = require('koa');
const app = koa();

const views = require('co-views');
const render = views(__dirname + '/views', {
    ext: 'ejs'
});

const mockedUser = {
    name: {
        first: 'Tobi',
        last: 'Holowaychuk',
    },
    species: 'ferret',
    age: 3,
};

const port = process.argv[2];

app.use(function* () {
    this.body = yield render('user', { user: mockedUser });
});

app.listen(process.argv[2]);
