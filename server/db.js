import mongoose from 'mongoose'

async function connect() {
  try {
    // Attempt to make a connection to MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // Log a success message if no errors occurred
    // Now we can use mongoose models to query the DB
    console.log(
      `Database successfully connected: ${connection.connection.host}`
    )
  } catch (error) {
    console.error('Database connection failed')
    console.log('Application will shut down')
    process.exit(1)
  }
}

export { connect }
