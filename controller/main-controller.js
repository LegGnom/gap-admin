const BaseController = require('./base-controller');


module.exports = class MainController extends BaseController {
    get() {
        this.render(require('../view/main.html'));
    }
};