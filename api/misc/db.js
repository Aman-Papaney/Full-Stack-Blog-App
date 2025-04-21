import mongoose from "mongoose"

const connectDB = () => {
	mongoose
		.connect("mongodb+srv://greenmilkweed:AGPn6x6AmFio108n@cluster1.ju0kk.mongodb.net/chronicles?retryWrites=true&w=majority&appName=Cluster1")
		.then(() => {
			console.log("Database Connection Successfull")
		})
		.catch((err) => {
			console.log(err)
		})
}

export default connectDB
