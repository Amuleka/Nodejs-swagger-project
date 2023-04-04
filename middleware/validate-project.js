const validator = require('../helpers/validate');

const saveProject = (req, res, next) => {
    const validationRule = {
      projectName: 'required|string',
      projectUser: 'required|string',
      projectDueDate: 'required|string',
      projectCompany: 'required|string',
      projectTeamMembers: 'required|integer'

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
    saveProject
};