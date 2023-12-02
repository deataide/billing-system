export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
  
    if (!bearerHeader) {
      return res.status(401).json({ mensagem: "Não autorizado." });
    }
  
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // eslint-disable-next-line no-undef
    const secret = process.env.authSecret;
  
    jwt.verify(bearerToken, secret, (err) => {
      if (err) {
        return res
          .status(401)
          .json({ mensagem: "Sessão inválida.", erro: err.message });
      }
  
      req.token = bearerToken;
  
      next();
    });
  };
  
  export const admin = (req, res, next) => {
    if (req.user && req.user.admin) {
      // O usuário é um administrador
      next();
    } else {
      // O usuário não é um administrador
      res.status(403).json({ message: 'Acesso proibido. O usuário não é um administrador.' });
    }
  };