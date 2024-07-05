const express = require('express')

const router = express.Router()


const UserSignUpController = require('../controller/user/userSignUp')
const userSingInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middelware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUser')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require("../controller/product/getProduct")
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')

router.post("/signup", UserSignUpController)
router.post("/signin", userSingInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

// admin panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

// product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)

module.exports = router