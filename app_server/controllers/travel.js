exports.travel = (req, res) => {
  res.render('travel', { title: 'Travel', year: new Date().getFullYear() });
};
