"use strict";

const Model = require('./model');


module.exports = {
    View: function (model, params) {
        return new Model(model, params);
    }
};