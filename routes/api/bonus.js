const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/bonus');
const { bonuses: bonusesCtrl } = require('../../controllers');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(bonusesCtrl.getAll));

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(bonusesCtrl.add)
);

router.get('/todaybonus', authenticate, ctrlWrapper(bonusesCtrl.getTodayBonus));

module.exports = router;
