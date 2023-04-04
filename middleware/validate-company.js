const validator = require('../helpers/validate');

const saveCompany = (req, res, next) => {
    const validationRule = {
      companyName: 'required|string',
      companyFounder: 'required|string',
      companyHeadquarters: 'required|string',
      companyFoundationDate: 'required|string',
      companyCEO: 'required|string'


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
    saveCompany
};