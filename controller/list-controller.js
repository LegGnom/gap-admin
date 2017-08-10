const BaseController = require('./base-controller');


module.exports = class ListController extends BaseController {
    * get() {
        let data = yield this.model.find();

        this.render(require('../view/list.html'), {
            list_data: data
        });
    }
};