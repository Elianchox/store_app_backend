
import { setData, getData, deleteData, updateData } from '../../../../db.js';
import { v4 } from 'uuid';

/* ---------------------------------- Store --------------------------------- */
const setInvoice = async (req, res) =>{
    try {
        const result = await setData([`INSERT INTO invoice VALUES ('${v4()}', '${req.body.invoice.fk_idstore}', '${req.body.invoice.fk_idworker}', CURRENT_TIMESTAMP, ${req.body.invoice.invoice_precio})`]);
        if (result.status === 0) {
            let query = '';
            const result = req.body.details.map((data, idx) =>{
                return `(${data.detail_num}, '${data.fk_idproduct}', ${data.detail_amount}, ${data.detail_price}, '${data.fk_idinvoice}')`
            })

            res.send(await setData([`INSERT INTO detail VALUES (${result.toString()})`]));
        }else{
            res.send(result);
        }
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}

const getInvoices = async (req, res)=>{
    try {
        res.send(await getData(['SELECT i.idinvoice, s.name_store, w.name_worker, i.invoice_date, i.invoice_precio FROM invoice i, store s, worker w WHERE s.idstore = i.fk_idstore AND w.idworker = i.fk_idworker']));
    } catch (error) {
        res.status(500).json(error);
    }
}

const getInvoice = async (req, res)=>{
    try {
        res.send(...await getData([`SELECT i.idinvoice, s.name_store, w.name_worker, i.invoice_date, i.invoice_precio FROM invoice i, store s, worker w WHERE s.idstore = i.fk_idstore AND w.idworker = i.fk_idworker AND i.idinvoice = '${req.body.idinvoice}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteInvoice = async (req, res)=>{
    try {
        await deleteData([`DELETE FROM invoice WHERE idinvoice = '${req.body.idinvoice}'`]);
        res.send(await deleteData([`DELETE FROM detail WHERE fk_idinvoice = '${req.body.idinvoice}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateInvoice = async (req, res)=>{
    try {
        res.send(await updateData(['UPDATE invoice SET ? WHERE idinvoice = ?', [req.body.data, req.body.idinvoice]]));
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    setInvoice,
    getInvoices,
    getInvoice,
    deleteInvoice,
    updateInvoice,
}