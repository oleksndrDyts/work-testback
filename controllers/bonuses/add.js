const { Bonus } = require('../../models/bonus');

const add = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.body);

  const newBonus = { ...req.body };
  // console.log(newBonus.items.map(el => ({ ...el, owner })));
  const result = await Bonus.create(
    newBonus.items.map(el => ({ ...el, owner }))
  );

  // const result = await Bonus.create({ ...newBonus, owner });

  console.log(result);

  res.status(201).json(result);
};

module.exports = add;
