const Controller = require('gap.js/controller');
const context = require('../context');


module.exports = class BaseController extends Controller {
    constructor(request, response, model) {
        let page;

        super(request, response);
        this.model = model;


        if (model) {
            page = context.menu.find(function (item) {
                return item.name === model.getName();
            });
        }

        this._context = {
            page: page
        }
    }


    render(template, _context) {
        super.render(template, Object.assign({}, context, this._context, _context))
    }
};