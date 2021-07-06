const knex = require("../db/connection");

const TABLE = knex("suppliers");

function create(supplier) {
  return TABLE.insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(supplier_id) {
  return TABLE.select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
  return TABLE.select("*")
    .where({ supplier_id: updatedSupplier.supplier_id })
    .update(updatedSupplier, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(supplier_id) {
  return TABLE.where({ supplier_id }).del();
}

module.exports = { create, read, update, delete: destroy };
