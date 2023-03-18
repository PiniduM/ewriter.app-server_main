import queryOnMainDB from "../queryOnMainDB.js";

const clearExpiredVerifications = (interval) => {
    const sql = 'DELETE FROM verifing_users WHERE expiration_date < NOW()';
    setInterval(() => {
        // db.query(query,(err,result) =>{
        //     if(err) {
        //         console.error(err)
        //     }else {
        //         console.log(result)
        //     }
        // })
        queryOnMainDB(sql)
        .then(result => console.log(result))
        .catch(err => console.log(err));

        
    },interval)
}


export default clearExpiredVerifications;