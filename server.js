const express = require('express'); 
const app = express(); 
const htmlRoutes = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes')
const PORT = process.env.PORT || 8080;
var path = require("path");


//middleware for 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use('/',htmlRoutes)
app.use('/api',apiRoutes)

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})


