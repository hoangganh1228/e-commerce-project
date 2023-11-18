// [GET] /
module.exports.index = async (req, res) => {
    res.render("client/pages/homes/index", {
        pageTitle: "Trang chủ",
    })
}