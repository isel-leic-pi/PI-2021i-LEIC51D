const frisby = require('frisby');
const serverBase = 'http://localhost:1904/api/'
const Joi = frisby.Joi

test('verify tasks server server is running', function () {
  return frisby.get(serverBase)
    .expect('status', 200);
});

describe('all tasks', () => {
  test('should get all tasks', () => {
    return frisby.get(`${serverBase}tasks`)
      .expect('status', 200)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8')
      .expect('jsonTypes', '*', {
        'id': Joi.number().required(),
        'name': Joi.string().required(),
        'description': Joi.string()
      })
  })
})


describe('specific tasks', () => {
  test('should get an existing task', () => {
    return frisby.get(`${serverBase}tasks/1`)
      .expect('status', 200)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8')
      .expect('jsonTypes', {
        'id': 1,
        'name': frisby.Joi.string().required(),
        'description': frisby.Joi.string()
      })
  })
  test('should get a 404 for a non existing task', () => {
    return frisby.get(`${serverBase}tasks/30`)
      .expect('status', 404)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8')
      .expect('jsonTypes', {
        'error': frisby.Joi.string().required(),
        'uri': `/api/tasks/30`,
      })
  })
})



