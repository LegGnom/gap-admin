"use strict";

const Router = require('gap.js/router');
const file = require('gap.js/helper/file');

const mime = require('mime-types');
const fs = require('fs');
const context = require('./context');

const mongoose = require('./mongoose');


Router.get(/^\/admin\/static/, function(req, res) {
    let path = __dirname + req.url.replace('/admin', '');
    let data = [];
    let readStream;

    if (fs.existsSync(path)) {

        res.setHeader('Content-Type', mime.lookup(path));

        readStream = fs.createReadStream(path);

        readStream.on('data', function (chunk) {
            data.push(chunk);
        });

        readStream.on('close', function () {
            res.send(Buffer.concat(data));
        });

        readStream.on('error', function (err) {
            res.send(err, 500);
        });

    } else {
        res.send('File not found!', 404);
    }
});


module.exports = class Admin {
    constructor(route = '/admin/') {
        this.route = route;

        context.base_path = route;

        Router.get(route, require('./controller/main-controller'))
    }

    addView(model) {
        context.menu.push({
            name: model.getName(),
            view: Router.resolve(this.route, model.getPathView()),
            list: Router.resolve(this.route, model.getPathList()),
            edit: Router.resolve(this.route, model.getPathEdit())
        });


        Router.get(
            Router.resolve(this.route, model.getPathList()),
            model.listHandler.bind(model)
        );


        Router.any(
            Router.resolve(this.route, model.getPathView()),
            model.viewHandler.bind(model)
        );


        Router.any(
            Router.resolve(this.route, model.getPathEdit()),
            model.editHandler.bind(model)
        );

        return this;
    }


    static get mongoose() {
        return mongoose;
    }
};