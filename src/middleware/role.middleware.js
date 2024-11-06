const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ message: "Authentication required" });
      }
  
      if (user.role !== requiredRole) {
        return res.status(403).json({ message: "Sizin bu əməliyyatı yerinə yetirmək icazəniz yoxdur" });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;