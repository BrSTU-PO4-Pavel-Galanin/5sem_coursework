require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PageHome = require("./components/pages/PageHome.js");
const PageGetProduct = require("./components/pages/PageGetProduct.js");
const PageGetProducts = require("./components/pages/PageGetProducts.js");
const PageAddProduct = require("./components/pages/PageAddProduct.js");
const PageDeleteProduct = require("./components/pages/PageDeleteProduct.js");
const PageUpdateProduct = require("./components/pages/PageUpdateProduct.js");
const PageSingIn = require("./components/pages/PageSingIn.js");

const app = express();
app.use(cors());
app.listen(process.env.NODEJS_LOCALE_PORT);
console.log(`Open ${process.env.NODEJS_BASEURL}:${process.env.NODEJS_LOCALE_PORT}/`);

app.get("/", (req, res) => PageHome(req, res));
app.get("/get-product/:GETargs", (req, res) => PageGetProduct(req, res));
app.get("/get-products/:GETargs", (req, res) => PageGetProducts(req, res));
app.post("/add-product", (request, response) => PageAddProduct(request, response));
app.get("/delete-product/:GETargs", (req, res) => PageDeleteProduct(req, res));
app.post("/update-product", (request, response) => PageUpdateProduct(request, response));
app.get("/sing-in/:GETargs", (req, res) => PageSingIn(req, res));
