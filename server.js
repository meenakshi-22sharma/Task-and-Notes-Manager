const express = require('express');
const path =require('path')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api',express.static(path.join(__dirname, 'views/home.html')))
app.use(require('./routes').router)
app.listen(4567,() => console.log('Server started at http://localhost:4567'))

