const koa = require('koa');
const parse = require('co-body');
const session = require('koa-session');

const app = koa();
app.keys = ['secret1', 'secret2', 'secret3'];

const port = process.argv[2];
const form = '<form action="/login" method="POST">\
      <input name="username" type="text" value="username">\
      <input name="password" type="password" placeholder="The password is \'password\'">\
      <button type="submit">Submit</button>\
    </form>';

app.use(session(app));

app.use(function* home(next) {
    if (this.request.path !== '/') return yield next;

    if (this.session.loggedIn) {
	this.body = 'hello world';
    } else {
	this.status = 401;
    }    
});

/**
 * If successful, the logged in user should be redirected to `/`.
 * hint: use `this.redirect`
 */
app.use(function* login(next) {
    if (this.request.path !== '/login') return yield next;
    if (this.request.method === 'GET') return this.body = form;

    if (this.request.method === 'POST') {
	const form = yield parse(this);
	if (form.username === 'username' && form.password === 'password') {
	    this.session.loggedIn = true;
	    this.redirect('/');
	    return;
	}
    }
    this.status = 400;
});

/**
 * Let's redirect to `/login` after every response.
 * If a user hits `/logout` when they're already logged out,
 * let's not consider that an error and rather a "success".
 */
app.use(function* logout(next) {
    if (this.request.path !== '/logout') return yield next;
    this.session.loggedIn = false;
    this.redirect('/login');
});

app.listen(process.argv[2]);
