import express from 'express'; 
import morgan from 'morgan'; 
import cors from 'cors'; 
import path from 'path';

const app= express();

//CONEXION A BASE DE DATOS

const mongoose = require('mongoose'); 
const uri = 'mongodb://localhost:27017/prueba';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(
    () => { 
        console.log('Conectado a DB')
     },
    err => { err }
  );


//MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json()); 

app.use(express.urlencoded({ extended: true }))



//RUTA
// app.get('/', function(req,res){

//     res.send('Hola mundo');

// });

app.use('/api', require('./routes/nota'));


const history = require('connect-history-api-fallback'); 
app.use(history()); 
app.use(express.static(path.join(__dirname, 'public')));

//PUERTO


app.set('puerto', process.env.PORT || 3000); 
app.listen(app.get('puerto'), function () { 
    console.log('Example app listening on port'+ app.get('puerto')); 
});