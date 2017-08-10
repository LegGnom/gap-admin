"use strict";

const MiddlewareModel = require('../middleware-model');


const DATA = Symbol('data');


module.exports = class MongooseModel extends MiddlewareModel {
    constructor(model, params={}) {
        super({
            name: model.modelName
        }, params);


        this.model = model;
    }


    find(params) {
        return this.model.find(params);
    }

    getFields() {
        let paths = this.model.schema.paths;
        let fields = Object.keys(paths);

        fields = fields.filter(function (item) {
            return !['_id', '__v'].includes(item);
        });

        fields = fields.map(function (key) {
            return {
                name: key,
                type: paths[key].instance,
                default: paths[key].default()
            }
        });

        return fields;
    }
};