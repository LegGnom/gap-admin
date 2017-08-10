const BaseController = require('./base-controller');


module.exports = class ViewController extends BaseController {
    * get() {
        // let data = this.model.find();

        console.log(this.model)

        this.render(require('../view/view.html'), {});
    }
};