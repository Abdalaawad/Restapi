const product_db = require(`../Schemadb/product_schema`);
const Status = require(`../utility/status_varible`);
const async_wrapper = require(`../Middleware/asyncWrapper`);

const getall_products = async_wrapper(async (req, res) => {
  // pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const all_data = await product_db.find({}).limit(limit).skip(skip);
  res.status(200).json({ Status: Status.Status_Success, data: { all_data } });
});

const get_product = async_wrapper(async (req, res) => {
  const product = req.params.product_id;
  const data = await product_db.findOne({ _id: product });
  res.status(200).json({ Status: Status.Status_Success, data: { data } });
});

const increase_product = async_wrapper(async (req, res) => {
  const { title, price, model, description } = req.body;
  const new_product = new product_db({ title, price, description, model });
  await new_product.save();
  res
    .status(201)
    .json({ Status: Status.Status_Success, data: { new_product } });
});

const modify_product = async_wrapper(async (req, res) => {
  const Product_id = req.params.product_id;
  const data = await product_db.findByIdAndUpdate(
    { _id: Product_id },
    { $set: { ...req.body } }
  );

  res.status(200).json({ Status: Status.Status_Success, data: { data } });
});

const delete_product = async_wrapper(async (req, res) => {
  const Product_id = req.params.product_id;
  await product_db.deleteOne({ _id: Product_id });
  res.status(200).json({ Status: Status.Status_Success, data: "null" });
});

module.exports = {
  getall_products,
  get_product,
  increase_product,
  modify_product,
  delete_product,
};
