const initialTasks = [
  {
    id: 1,
    name: "task1",
    description: "Description form task 1"
  }
]

const tasksDbFunction = require('./../../tasks-db')
const tasksServicesFunction = require('./../../tasks-services')


describe('Task deletion', () => {
  let tasksDb = null
  let tasksServices = null
  beforeEach(() => {
    tasksDb = tasksDbFunction(initialTasks)
    tasksServices = tasksServicesFunction(tasksDb)
  })
  
  test('delete an existing task', function (done) {
    tasksServices.deleteTask(1, (err, data) => { 
      expect(err).toBeFalsy()
      tasksServices.getAllTasks(tasks => { 
        expect(tasks.length).toBe(0)
        done()
      })
    })
  })

  test('delete a non existing task', function (done) {
    tasksServices.deleteTask(0, (err, data) => { 
      expect(err).toBeTruthy()
      tasksServices.getAllTasks(tasks => { 
        expect(tasks.length).toBe(1)
        done()
      })
    })
  })

  test('delete the same task twice', function (done) {
    tasksServices.deleteTask(1, (err, data) => { 
      expect(err).toBeFalsy()
      tasksServices.getAllTasks(tasks => { 
        expect(tasks.length).toBe(0)
        tasksServices.deleteTask(1, (err, data) => { 
          expect(err).toBeTruthy()
          tasksServices.getAllTasks(tasks => { 
            expect(tasks.length).toBe(0)
            done()
          })
        })
      })
    })
  })  
})
