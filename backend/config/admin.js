export const admin = (req, res, next) => {
    if (req.user && req.user.admin) {
      // O usuário é um administrador
      next();
    } else {
      // O usuário não é um administrador
      res.status(403).json({ message: 'Acesso proibido. O usuário não é um administrador.' });
    }
  };    