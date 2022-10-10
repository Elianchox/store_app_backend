import { Router } from 'express';
import { routerApi_v1 } from './API_v1/index.js';

const routers = Router();

routers.get('/', (req, res)=>{
    res.json({
        msg:'Hellow World'
    });
});

routers.use('/api/v1/', routerApi_v1);

export { routers };