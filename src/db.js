import mysql from 'mysql2';
import { DataBaseKeys } from './keys.js';

var pool = mysql.createPool({
    ...DataBaseKeys,
    connectionLimit:10
});

const ConnDb = (query)=>{
    return new Promise((resolve, reject)=>{
        pool.getConnection((error, conn)=>{
            if (error) {
                reject(error);
            }else{
                conn.query(...query, (error2, records)=>{
                    if (!error2) {
                        conn.release();
                        resolve(records);
                    }else{
                        conn.release();
                        reject(error2);
                    }
                });

            }
        });
    })
}

const executeQuery = async (query)=>{
    return await ConnDb(query)
        .then(data=>{
            return data
        })
        .catch((error) => {
            console.log(error)
            throw error
        });
}

const setData = async (query)=>{
    try {
        const data = await executeQuery(query);
        return data.affectedRows ? {status:0, message:"SUCCESS"} : {status:1, message:"Data no add"}
    } catch (error) {
        throw error.errno === 1062 ?
            {status:1062, message:"Duplicate Entry"} :
            {status:1, message:"Error Internal db"}
    }
}

const getData = async (query)=>{
    try {
        return await executeQuery(query);
    } catch (error) {
        throw {status:1, message:"Error Internal db"};
    }
}

const deleteData = async (query)=>{
    try {
        const data = await executeQuery(query);
        return data.affectedRows ?
            {status:0, message:"SUCCESS"} :
            {status:1, message:"Data no found"}
    } catch (error) {
        throw {status:-1, message:error.message};
    }
}

const updateData = async (query)=>{
    try {
        const data = await executeQuery(query);
        return data.affectedRows ?
            {status:0, message:"SUCCESS"} :
            {status:1, message:"Data no found"}
    } catch (error) {
        throw error.errno === 1062 ?
            {status:1062, message:"Duplicate Entry"} :
            {status:1, message:"Error Internal db"}
    }
}

export {
    setData,
    getData,
    deleteData,
    updateData,
};