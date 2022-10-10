
import { setData, getData, deleteData, updateData } from '../../../../db.js';
import { v4 } from 'uuid';

/* ---------------------------------- Store --------------------------------- */
const setWarehouse = async (req, res) =>{
    try {
        res.send(await setData([
            `INSERT INTO warehouse VALUES ('${v4()}', '${req.body.fk_idstore}', '${req.body.fk_idproduct}', ${req.body.warehouse_quantity})`
        ]));
    } catch (error) {
        res.status(500).send(error);
    }
}

const getWarehouses = async (req, res)=>{
    try {
        res.send(await getData(['SELECT * FROM warehouse']));
    } catch (error) {
        res.status(500).json(error);
    }
}

const getWarehouse = async (req, res)=>{
    try {
        res.send(...await getData([`SELECT * FROM warehouse WHERE idwarehouse = '${req.body.idwarehouse}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteWarehouse = async (req, res)=>{
    try {
        res.send(await deleteData([`DELETE FROM warehouse WHERE idwarehouse = '${req.body.idwarehouse}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateWarehouse = async (req, res)=>{
    try {
        res.send(await updateData(['UPDATE warehouse SET ? WHERE idwarehouse = ?', [req.body.data, req.body.idwarehouse]]));
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    setWarehouse,
    getWarehouses,
    getWarehouse,
    deleteWarehouse,
    updateWarehouse,
}