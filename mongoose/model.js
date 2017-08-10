"use strict";

const isFunction = require('gap.js/helper/is-function');
const MiddlewareModel = require('../middleware-model');


const DATA = Symbol('data');
const NORMALIZE_DATA_HANDLER = Symbol('normalize data handler');


module.exports = class MongooseModel extends MiddlewareModel {
    constructor(model, params={}) {
        super({
            name: model.modelName
        }, params);


        this.model = model;
    }


    find(params={}) {
        if (params.id) {
            params._id = params.id;
            delete params.id;
        }

        return this.model.find(params);
    }


    get(params={}) {
        if (params.id) {
            params._id = params.id;
            delete params.id;
        }

        return this.model.findOne(params).then(data => {
            data = data.toJSON();

            data.id = data._id;
            delete data._id;

            return data;
        });
    }

    count() {
        return this.model.count();
    }

    save(form) {
        let data = this[NORMALIZE_DATA_HANDLER](form);

        return new this.model(data).save();
    }

    update(where, form) {
        let data = this[NORMALIZE_DATA_HANDLER](form);

        where._id = where.id;
        delete where.id;

        this.model.update(where, data);
    }

    getFields() {
        let paths = this.model.schema.paths;
        let fields = Object.keys(paths);

        fields = fields.filter(function (item) {
            return !['_id', '__v'].includes(item);
        });

        fields = fields.map(function (key) {
            let def = paths[key].default();
            let data = {
                name: key,
                type: paths[key].instance,
                default: isFunction(def) ? def() : def
            };

            if (data.type === 'Date') {
                // data.default = data.default();
            }

            return data
        });

        return fields;
    }

    [NORMALIZE_DATA_HANDLER](form) {
        let data = {};

        this.getFields().forEach(function (item) {

            if (item.type !== 'Array') {
                if (form.get(item.name)) {
                    data[item.name] = form.get(item.name);
                }
            } else {
                data[item.name] = form.getList(item.name);
            }
        });

        return data;
    }
};