
import { setData, getData, deleteData, updateData } from '../../../../db.js';
import { v4 } from 'uuid';

/* ---------------------------------- Store --------------------------------- */
const setProduct = async (req, res) =>{
    try {
        res.send(await setData([
            `INSERT INTO product VALUES ('${v4()}', '${req.body.product_name}', ${req.body.product_precio}, '${req.body.product_marca}', '${req.body.fk_supplier_id}')`
        ]));
    } catch (error) {
        res.status(500).send(error);
    }
}

const getProducts = async (req, res)=>{
    try {
        res.send(await getData(['SELECT * FROM product']));
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProduct = async (req, res)=>{
    try {
        res.send(...await getData([`SELECT * FROM product WHERE idproduct = '${req.body.idproduct}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteProduct = async (req, res)=>{
    try {
        res.send(await deleteData([`DELETE FROM product WHERE idproduct = '${req.body.idproduct}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateProduct = async (req, res)=>{
    try {
        res.send(await updateData(['UPDATE product SET ? WHERE idproduct = ?', [req.body.data, req.body.idproduct]]));
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    setProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}