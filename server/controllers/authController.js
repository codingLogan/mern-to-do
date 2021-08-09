import bcrypt from 'bcryptjs'
import { getHashedPassword } from '../auth/auth.js'
import User from '../models/userModel.js'

async function loginHandler(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      email,
    })

    const matches = await bcrypt.compare(password, user.password)

    if (matches) {
      res.json({
        token: 'testtoken',
      })
    } else {
      res.status(401)
      throw new Error('Incorrect email or password')
    }
  } catch (error) {
    next(error)
  }
}

export { loginHandler }
