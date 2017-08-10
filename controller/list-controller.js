const BaseController = require('./base-controller');


module.exports = class ListController extends BaseController {
    * get() {
        let data = yield this.model.find();
        let count = yield this.model.count();

        this.render(require('../view/list.html'), {
            count: count,
            list_data: data,
            fields: this.model.getFields()
        });
    }
};