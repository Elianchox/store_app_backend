
import { setData, getData, deleteData, updateData } from '../../../../db.js';
import { v4 } from 'uuid';

/* -------------------------------- Supplier -------------------------------- */
const setSupplier = async (req, res) =>{
    try {
        res.send(await setData([`INSERT INTO supplier VALUES ('${v4()}', '${req.body.supplier_name}')`]));
    } catch (error) {
        res.status(500).send(error);
    }
}

const getSuppliers = async (req, res)=>{
    try {
        res.send(await getData(['SELECT * FROM supplier']));
    } catch (error) {
        res.status(500).json(error);
    }
}

const getSupplier = async (req, res)=>{
    try {
        res.send(...await getData([`SELECT * FROM supplier WHERE idsupplier = '${req.body.idsupplier}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteSupplier = async (req, res)=>{
    try {
        res.send(await deleteData([`DELETE FROM supplier WHERE idsupplier = '${req.body.idsupplier}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateSupplier = async (req, res)=>{
    try {
        res.send(await updateData(['UPDATE supplier SET ? WHERE idsupplier = ?', [req.body.data, req.body.idsupplier]]));
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    setSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier,
}