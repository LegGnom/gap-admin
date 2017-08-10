const Server = require('gap.js/server');
const Admin = require('../index');
const models = require('./models');

const admin = new Admin();


admin.addView(
    Admin.mongoose.View(models.User)
);


admin.addView(
    Admin.mongoose.View(models.Post)
);


Server.run('127.0.0.1', 5005);


