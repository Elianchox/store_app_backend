
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { routers } from './routers/index.js'



/* ----------------------------- Initializations ---------------------------- */
const app = express();
app.set('port', process.env.PORT || 5000);

/* ------------------------------- Middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(urlencoded({extended:true}));
app.use(json());

/* ---------------------------------- cods ---------------------------------- */
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/* --------------------------------- Routes --------------------------------- */
// app.get('/', async (req, res)=>{

//     pool.getConnection((err, conn)=>{
//         if (err) {
//             res.json({status:-1, message:"Error to connect to DB."})
//         }else{
//             conn.query('SELECT * FROM vehicle', (err2, records)=>{
//                 if (!err2) {
//                     res.json(records);
//                 }else{
//                     console.log(err2);
//                     res.status(500).json({status:-1, message:err2.message});
//                 }
//             });

//             conn.release();
//         }
//     });
// })
app.use('/', routers);

/* ----------------------------- Server Listener ---------------------------- */
app.listen(app.get('port'), ()=>{
    console.log('Server on Port', app.get('port'));
});
