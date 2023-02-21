const { Schema, model } = require('mongoose');
const Joi = require('joi');

const bonusSchema = new Schema(
  {
    goods: {
      type: String,
      required: [true, 'Set name of goods'],
    },

    dateData: {
      date: {
        type: String,
        required: [true, 'Set date'],
      },
      hours: {
        type: String,
        required: [true, 'Set time'],
      },
    },

    bonus: {
      type: Number,
      required: [true, 'Set bonus'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

bonusSchema.post('save', (err, data, next) => {
  err.status = 400;

  next();
});

const addSchema = Joi.object({
  dateData: Joi.object(),
  items: Joi.array().required(),
  goods: Joi.string().messages({
    'string.empty': 'field must contain "goods"',
    'any.required': 'missing required "goods" field',
  }),
  date: Joi.string()
    .pattern(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    )
    .messages({
      'string.empty': 'field must contain "date"',
      'any.required': 'missing required "date" field',
      'string.pattern.base': 'date is invalid',
    }),
  bonus: Joi.number().messages({
    'string.empty': 'field must contain "bonus"',
    'any.required': 'missing required "bonus" field',
  }),
});

const schemas = {
  addSchema,
};

const Bonus = model('bonus', bonusSchema);

module.exports = {
  Bonus,
  schemas,
};
