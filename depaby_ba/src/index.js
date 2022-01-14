require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const swagger_jsdoc = require('swagger-jsdoc');
const swagger_ui_express = require('swagger-ui-express');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(cors());

// = = = = = = = = Swagger
const swagger_data = {
  swagger: "2.0",
  info: {
    version: "2022.1.13",
    title: "Документация API",
    description: "Расписал возможные API. ",
    contact: {
      name: "Павел Иннокентьевич Галанин",
      email: "Pavel.Innokentevich.Galanin@gmail.com"
    },
  },
  host: `${process.env.depaby_nodejs_host}:${process.env.depaby_nodejs_port}`,
  tags: [
    {
      name: "admin",
      description: "Манипуляции с таблицей администраторов"
    },
    {
      name: "products",
      description: "Манипуляции с таблицей продуктов"
    },
    {
      name: "documents",
      description: "Манипуляции с таблицей документов"
    },
    {
      name: "contacts",
      description: "Манипуляции с таблицей контактов"
    },
  ],
  schemes: [
    "http"
  ],
};

const depaby_swagger_options = {
  swaggerDefinition: swagger_data,
  apis: [
    "src/index.js",
    "src/routes/auth/auth.js",
    "src/routes/products/products.js",
    "src/routes/products/products_create.js",
    "src/routes/products/products_read.js",
    "src/routes/products/products_update.js",
    "src/routes/products/products_delete.js",
  ],
};
const depaby_swagger_docs = swagger_jsdoc(depaby_swagger_options);
app.use("/docs", swagger_ui_express.serve, swagger_ui_express.setup(depaby_swagger_docs));
// = = = = = = = = end swagger

// Start server
app.listen(process.env.depaby_nodejs_port);
console.log(`Open ${process.env.depaby_nodejs_protocol}//${process.env.depaby_nodejs_host}:${process.env.depaby_nodejs_port}/`);

app.get('/', (req, res) => {
  const depaby_ba_url = `${process.env.depaby_nodejs_protocol}//${process.env.depaby_nodejs_host}:${process.env.depaby_nodejs_port}/docs`;
  res.send(`Read documentation: <a href="${depaby_ba_url}">${depaby_ba_url}</a>`);
})

// auth
app.use("/api", require('./routes/auth/auth'));

// products CRUD
app.use("/api", require('./routes/products/products_create'));
app.use("/api", require('./routes/products/products_update'));
app.use("/api", require('./routes/products/products_read'));
app.use("/api", require('./routes/products/products_delete'));