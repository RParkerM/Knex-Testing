const knex = require("../db/connection");

const TABLE = knex("products");

function listOutOfStockCount() {
  return TABLE.select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

function listPriceSummary() {
  return TABLE.select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

function list() {
  return knex("products").select("*");
}

function read(product_id) {
  return knex("products").select("*").where({ product_id }).first();
}

module.exports = { list, read, listOutOfStockCount, listPriceSummary };
