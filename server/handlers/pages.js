exports.home = (req, res) => {
  res.render('01_home.ejs', null);
};

exports.A01 = (req, res) => {
  res.render('A01_common-components.ejs', null);
};

exports.B01 = (req, res) => {
  res.render('B01_postgresql.ejs', null);
};