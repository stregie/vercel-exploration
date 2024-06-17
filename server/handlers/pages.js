exports.home = (req, res) => {
  res.render('home.ejs', null);
};

exports.subpage = (req, res) => {
  res.render('subpage.ejs', null);
};

exports.simpleapi = (req, res) => {
  res.send("Simple text as response");
};