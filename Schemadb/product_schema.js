const mongooose = require(`mongoose`);

const product = new mongooose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
});

module.exports = mongooose.model(`Product`, product);
