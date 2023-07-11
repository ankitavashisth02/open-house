const express = require('express');
const mongoose= require('mongoose');
const app = express();

// DATABASE CONNECTIONS
mongoose.connect('mongodb+srv://anchitasharma209:Qy6BFw1fYUWgqEI7@cluster0.kogmfqh.mongodb.net/?retryWrites=true&w=majority',{
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then((data)=>{
    console.log(`mongodb connection established ${data.connection.host}`);
}).catch((error)=>{
    console.log(`connection error: ${error}`);
})


app.use(express.json());
const port = process.env.PORT ||8081;

const user = require('./routes/userRoutes');
const listing = require('./routes/propertyRoutes');
app.use ("/api/v1", user,listing);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });