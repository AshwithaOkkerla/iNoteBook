// import mongoose from "mongoose"
// import express from "express"

// await mongoose.connect("mongodb://localhost:27017")
// const app = express()
// const port = 3000

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

// app.listen(port,()=>{
//     console.log(`Example app listening on port ${port}`)
// })

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Employees');
	console.log("connected to mongodb")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main ;