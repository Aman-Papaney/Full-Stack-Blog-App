import mongoose from "mongoose"

const connectDB = () => {
	mongoose
		.connect("mongodb://127.0.0.1:27017/chronicles")
		.then(() => {
			console.log("Database Connection Successfull")
		})
		.catch((err) => {
			console.log(err)
		})
}

export default connectDB
