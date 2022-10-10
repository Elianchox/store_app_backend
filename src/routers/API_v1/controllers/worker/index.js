
import { setData, getData, deleteData, updateData } from '../../../../db.js';
import { v4 } from 'uuid';

/* ---------------------------------- Store --------------------------------- */
const setWorker = async (req, res) =>{
    try {
        res.send(await setData([
            `INSERT INTO worker VALUES ('${v4()}', ${req.body.cc_worker}, '${req.body.name_worker}', ${req.body.age_worker}, '${req.body.fk_idstore}')`
        ]));
    } catch (error) {
        res.status(500).send(error);
    }
}

const getWorkers = async (req, res)=>{
    try {
        res.send(await getData(['SELECT * FROM worker']));
    } catch (error) {
        res.status(500).json(error);
    }
}

const getWorker = async (req, res)=>{
    try {
        res.send(...await getData([`SELECT * FROM worker WHERE idworker = '${req.body.idworker}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteWorker = async (req, res)=>{
    try {
        res.send(await deleteData([`DELETE FROM worker WHERE idworker = '${req.body.idworker}'`]));
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateWorker = async (req, res)=>{
    try {
        res.send(await updateData(['UPDATE worker SET ? WHERE idworker = ?', [req.body.data, req.body.idworker]]));
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    setWorker,
    getWorkers,
    getWorker,
    deleteWorker,
    updateWorker,
}