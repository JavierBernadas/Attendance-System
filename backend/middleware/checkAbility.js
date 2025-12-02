module.exports = (action, subject) => {
  return (req, res, next) => {
    if (!req.ability.can(action, subject)) {
      return res.status(403).json({ error: "Forbidden Role : not authorized" } );
    }
    next();
  };
};
