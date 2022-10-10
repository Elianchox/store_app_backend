
import { setData, getData, deleteData, updateData } from '../../../../db.js';
import { v4 } from 'uuid';

/* ---------------------------------- Store --------------------------------- */
const setStore = async (req, res) =>{
    try {
        res.send(await setData([`INSERT INTO store VALUES ('${v4()}', '${req.body.name}')`]));
    } catch (error) {
        res.status(500).send(error);
    }
}

const getStores = async (req, res)=>{
    try {
        res.send(await getData(['SELECT * FROM store']));
    } catch (error) {
        res.status(500).json(error);
    }
}

const getStore = async (req, res)=>{
    try {
        res.send(...await getData([`SELECT * FROM store WHERE idstore = '${req.body.idstore}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteStore = async (req, res)=>{
    try {
        res.send(await deleteData([`DELETE FROM store WHERE idstore = '${req.body.idstore}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateStore = async (req, res)=>{
    try {
        res.send(await updateData(['UPDATE store SET ? WHERE idstore = ?', [req.body.data, req.body.idstore]]));
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    setStore,
    getStores,
    getStore,
    deleteStore,
    updateStore,
}