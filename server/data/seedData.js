import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { connect } from '../db.js'
import User from '../models/userModel.js'

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

function getDefaultUsers() {
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

function insertData() {
  const users = getDefaultUsers()
  return User.insertMany(users)
}

start()
