const express = require('express');
const router = express.Router();
const QueryProductCategories = require('../../scripts/AbstractQueryCrud/QueryCrudProductsCategories');

/**
 * @swagger
 * /api/productCategories:
 *  put:
 *    tags:
 *      - productCategories
 *    description: Обновляем данные по ид
 *    parameters:
 *      - in: body
 *        description: Тело запроса
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            login:
 *              type: string
 *            password:
 *              type: string
 *            id:
 *              type: integer
 *            data:
 *              $ref: '#/definitions/depaby_productCategory'
*    responses:
 *      '200':
 *        description: Успешное обновление
 *        schema:
 *          type: object
 *          properties:
 *            code:
 *              type: integer
 *            message:
 *              type: string
 *      '202':
 *        description: Не авторизовался
 *        schema:
 *          type: object
 *          properties:
 *            code:
 *              type: integer
 *            message:
 *              type: string
 *      '418':
 *        description: Ошибка на сервере
 *        schema:
 *          type: object
 *          properties:
 *            code:
 *              type: integer
 *            message:
 *              type: string
 */

router.put("/productCategories", async function (req, res) {
  // Создаем экземпляр класса
  const productCategories_object = new QueryProductCategories(req.body.login, req.body.password);

  // Выполняем sql
  const productCategories_response = await productCategories_object.update(req.body.id, req.body.data);

  // Возвращаем ответ сервера
  res.status(productCategories_response.code).send(productCategories_response);
});

module.exports = router;
