const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
  const data = await productsService.list();
  res.json({ data });
}

async function listOutOfStockCount(req, res) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listPriceSummary(req, res) {
  res.json({ data: await productsService.listPriceSummary() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
};
