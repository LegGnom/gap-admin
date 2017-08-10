const BaseController = require('./base-controller');


module.exports = class editController extends BaseController {
    * get(req) {
        let count = yield this.model.count();
        let values = {};

        if (req.query.get('uid')) {
            values = yield this.model.get({
                id: req.query.get('uid')
            });

            console.log(values)
        }


        this.render(require('../view/edit.html'), {
            count: count,
            values: values,
            fields: this.model.getFields()
        });
    }


    * put(req) {
        let save = yield this.model.save(req.form);

        this.json({
            result: save
        })

    }


    * post(req) {
        this.model.update({
            id: req.form.get('id')
        }, req.form);

        this.json({
            success: 1
        })
    }
};