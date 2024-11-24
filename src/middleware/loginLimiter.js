const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 5 dəqiqəlik zaman pəncərəsi
  max: 5, // 15 dəqiqə ərzində maksimum 5 giriş cəhdi
  message: 'Çoxlu sayda uğursuz giriş cəhdi. Xahiş edirik, bir müddət sonra yenidən cəhd edin.'
});

module.exports = loginLimiter;