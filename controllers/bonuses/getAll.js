const { Bonus } = require('../../models/bonus');
const { formatDate } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const result = await Bonus.find({
    owner,
    // 'dateData.date': `${date}`,
  }).populate('owner', 'name');

  const resu = req.query.date
    ? result.filter(el => el.dateData.date.slice(3) === req.query.date.slice(3))
    : result.filter(el => el.dateData.date === formatDate(Date.now()));

  // console.log(resu);
  res.json(resu);
  // console.log(result);
};

module.exports = getAll;
