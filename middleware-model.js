"use strict";

const MODEL_DATA = Symbol('model data');

const ListController = require('./controller/list-controller');
const ViewController = require('./controller/view-controller');
const EditController = require('./controller/edit-controller');


module.exports = class Model {
    constructor(model_data, params) {

        this.params = Object.assign({
            name: '',
            path_list: '',
            path_view: '',
            path_edit: ''
        }, params);


        this[MODEL_DATA] = model_data;
    }


    getName() {
        return this.params.name || this[MODEL_DATA].name;
    }

    getPathList() {
        return this.params.path_list || `/${this[MODEL_DATA].name.toLowerCase()}/`;
    }

    getPathView() {
        return this.params.path_list || `/${this[MODEL_DATA].name.toLowerCase()}/view/<uid>/`;
    }

    getPathEdit() {
        return this.params.path_edit || `/${this[MODEL_DATA].name.toLowerCase()}/edit/`;
    }

    viewHandler(request, response) {
        new ViewController(request, response, this);
    }

    listHandler(request, response) {
        new ListController(request, response, this);
    }

    editHandler(request, response) {
        new EditController(request, response, this);
    }


    getFields() {
        return [];
    }
};