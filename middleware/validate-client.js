const validator = require('../helpers/validate');

const saveClient = (req, res, next) => {
    const validationRule = {
      clientName: 'required|string',
      clientCity: 'required|string',
      userInCharge: 'required|string',
      yearsWithTheCompany: 'required|string'

    };
        
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveClient
};