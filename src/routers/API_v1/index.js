import { Router } from 'express';
import { setStore, getStores, getStore, deleteStore, updateStore } from './controllers/Store/index.js';
import { setSupplier, getSuppliers, getSupplier, deleteSupplier, updateSupplier } from './controllers/Supplier/index.js';
import { setWorker, getWorkers, getWorker, deleteWorker, updateWorker } from './controllers/worker/index.js';
import { setProduct, getProducts, getProduct, deleteProduct, updateProduct } from './controllers/product/index.js';
import { setWarehouse, getWarehouses, getWarehouse, deleteWarehouse, updateWarehouse } from './controllers/warehouse/index.js';
import {  setInvoice, getInvoices, getInvoice, deleteInvoice, updateInvoice } from './controllers/invoice/index.js';

const routerApi_v1 = Router();

routerApi_v1.get('/', (req, res)=>{
    res.json({
        msg:'Welcome to Api'
    });
});

/* -------------------------------------------------------------------------- */
/*                                   Setters                                  */
/* -------------------------------------------------------------------------- */
routerApi_v1.post('/setStore', setStore);
routerApi_v1.get('/getStores', getStores);
routerApi_v1.put('/updateStore', updateStore);
routerApi_v1.get('/getStore', getStore);
routerApi_v1.delete('/deleteStore', deleteStore);

/* -------------------------------------------------------------------------- */
/*                                  Supplier                                  */
/* -------------------------------------------------------------------------- */
routerApi_v1.post('/setSupplier', setSupplier);
routerApi_v1.get('/getSuppliers', getSuppliers);
routerApi_v1.put('/updateSupplier', updateSupplier);
routerApi_v1.get('/getSupplier', getSupplier);
routerApi_v1.delete('/deleteSupplier', deleteSupplier);

/* -------------------------------------------------------------------------- */
/*                                   Worker                                   */
/* -------------------------------------------------------------------------- */
routerApi_v1.post('/setWorker', setWorker);
routerApi_v1.get('/getWorkers', getWorkers);
routerApi_v1.put('/updateWorker', updateWorker);
routerApi_v1.get('/getWorker', getWorker);
routerApi_v1.delete('/deleteWorker', deleteWorker);

/* -------------------------------------------------------------------------- */
/*                                   Product                                  */
/* -------------------------------------------------------------------------- */
routerApi_v1.post('/setProduct', setProduct);
routerApi_v1.get('/getProducts', getProducts);
routerApi_v1.put('/updateProduct', updateProduct);
routerApi_v1.get('/getProduct', getProduct);
routerApi_v1.delete('/deleteProduct', deleteProduct);

/* -------------------------------------------------------------------------- */
/*                                  Warehouse                                 */
/* -------------------------------------------------------------------------- */
routerApi_v1.post('/setWarehouse', setWarehouse);
routerApi_v1.get('/getWarehouses', getWarehouses);
routerApi_v1.put('/updateWarehouse', updateWarehouse);
routerApi_v1.get('/getWarehouse', getWarehouse);
routerApi_v1.delete('/deleteWarehouse', deleteWarehouse);

/* -------------------------------------------------------------------------- */
/*                                   Invoice                                  */
/* -------------------------------------------------------------------------- */
routerApi_v1.post('/setInvoice', setInvoice);
routerApi_v1.get('/getInvoices', getInvoices);
routerApi_v1.put('/getInvoice', getInvoice);
routerApi_v1.get('/deleteInvoice', deleteInvoice);
routerApi_v1.delete('/updateInvoice', updateInvoice);

export { routerApi_v1 };
