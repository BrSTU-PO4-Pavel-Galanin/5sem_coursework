const express = require('express');
const router = express.Router();
const QueryContacts = require('../../scripts/AbstractQueryCrud/QueryCrudContacts');

/**
 * @swagger
 * /api/contacts:
 *  get:
 *    tags:
 *      - contacts
 *    description: Получаем все записи из таблицы БД
 *    parameters:
 *      - in: query
 *        name: id
 *        description: Вывод массива записи (нашли по ИД)
 *        required: false
 *        type: integer
 *    responses:
 *      '200':
 *        description: Успешный ответ
 *        schema:
 *          type: object
 *          properties:
 *            code:
 *              type: integer
 *            message:
 *              type: string
 *            data:
 *              type: array
 *              items:
 *                $ref: '#/definitions/depaby_contact'
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

router.get("/contacts", async function (req, res) {
  const contacts_object = new QueryContacts();
  const contacts_response = await contacts_object.read(req.query);
  res.status(contacts_response.code).send(contacts_response);
});

module.exports = router;
