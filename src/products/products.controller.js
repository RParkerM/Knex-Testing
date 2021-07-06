const productsService = require("./products.service");

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

async function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  // const data = productsService.list();
  // res.json({ data });
  const data = await productsService.list();
  res.json({ data });
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
