const nationalInsurance = require('../services/national-insurance');

module.exports = (req, res) => {
  const date = req.headers['x-run-date'];
  res.send({
    income: req.income,
    ni: nationalInsurance(date)(req.income),
  });
};
