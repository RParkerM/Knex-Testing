const categoriesService = require("./categories.services");

async function list(req, res) {
  try {
    const data = await categoriesService.list();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: [list],
};
