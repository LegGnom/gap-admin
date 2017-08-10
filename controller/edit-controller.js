const BaseController = require('./base-controller');


module.exports = class editController extends BaseController {
    * get() {
        // let data = yield this.model.find();

        this.render(require('../view/edit.html'), {
            fields: this.model.getFields()
        });
    }
};