const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  // console.log(req.cookies.cartId);

  if(!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const expiresCookie = 365 * 24 * 60 * 60 * 1000;

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie)
    });
  } else {
    // Lấy ra thôi
  }

  next();
}