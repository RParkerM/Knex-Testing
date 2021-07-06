const categoriesService = require("./categories.services");

async function list(req, res) {
  const data = await categoriesService.list();
  res.json({ data });
}

module.exports = {
  list: [list],
};
