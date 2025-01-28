import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://sbravoc03:4DkXfryUZZb9zPZK@cluster0.ak3sg.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB connect on ${url}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
