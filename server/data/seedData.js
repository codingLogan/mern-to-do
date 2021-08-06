import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { connect } from '../db.js'
import User from '../models/userModel.js'
import ToDo from '../models/toDoModel.js'

dotenv.config()
connect()

async function start() {
  try {
    await clearData()
    await insertData()

    console.log('Data seed success')
    process.exit()
  } catch (error) {
    console.error('Data seed failed!', error)
    process.exit(1)
  }
}

function clearData() {
  return User.deleteMany()
}

function createDefaultUsers() {
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync('asdf', salt)
  const testNames = ['John', 'Jane', 'Admin', 'Dev']

  const users = testNames.map((name) => ({
    name,
    email: `${name.toLowerCase()}@dev.com`,
    password,
  }))

  return users
}

function createDefaultToDos(user) {
  const toDos = [
    'Get out of bed',
    'Shower',
    'Make Breakfast',
    'Leave the house',
    'Save the world',
  ]

  return toDos.map((title) => ({
    user: user,
    title,
    isDone: false,
  }))
}

async function insertData() {
  const users = createDefaultUsers()
  const createdUsers = await User.insertMany(users)

  const toDos = createDefaultToDos(createdUsers[0]._id)
  await ToDo.insertMany(toDos)
}

start()
