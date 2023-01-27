import db from "../maindbConnection.js";

const clearExpiredVerifications = (interval) => {
    const query = 'DELETE FROM verifing_users WHERE expiration_date < NOW()';
    setInterval(() => {
        db.query(query,(err,result) =>{
            if(err) {
                console.error(err)
            }else {
                console.log(result)
            }
        })
    },interval)
}


export default clearExpiredVerifications;