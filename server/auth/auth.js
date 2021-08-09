import bcrypt from 'bcryptjs'

function getHashedPassword(password) {
  return bcrypt.hashSync(password, 10)
}

export { getHashedPassword }
