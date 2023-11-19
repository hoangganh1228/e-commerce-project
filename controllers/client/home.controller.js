const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req, res) => {
    // Lấy ra sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active" 
    }).limit(6);
    
    // Hết Lấy ra sản phẩm nổi bật
    const newProducts = productsHelper.priceNewProducts(productsFeatured);

    
    res.render("client/pages/homes/index", {
        pageTitle: "Trang chủ",
        productsFeatured: newProducts
    })
}