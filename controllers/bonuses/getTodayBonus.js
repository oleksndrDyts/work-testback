const { Bonus } = require('../../models/bonus');
const { formatDate } = require('../../helpers');

const getTodayBonus = async (req, res) => {
  const { _id: owner } = req.user;

  const date = formatDate(Date.now());
  // console.log();

  const data = await Bonus.find({
    owner,
    'dateData.date': `${date}`,
  }).populate('owner', 'name');

  const result = data.reduce((acc, { bonus }) => (acc += bonus), 0);

  res.json(result);
  console.log(result);
};

module.exports = getTodayBonus;
