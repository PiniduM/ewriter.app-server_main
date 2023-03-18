import queryOnMainDB from "../../../controllers/queryOnMainDB.js";
import validateLoginOrHandleErrors from "../../../controllers/validateLoginOrHandleErrors.js"

const updateProfile_created = (data,res) => {

    const loginToken = data.loginToken;

    const creadentials = validateLoginOrHandleErrors(loginToken,res);
    if(!creadentials) return;

    const id = creadentials.id;

    const sql = "UPDATE users SET profile_created = 'y' WHERE id = ? AND profile_created = 'n' ;";
    const values = [id];

    queryOnMainDB(sql,values)
    .then(result => {
        if(result[0].affectedRows === 1) {
            res.status(200).send("updated");
            return;
        }else {
            res.status(200).send("not_updated");
            return;
        }
    })
    .catch ( () => {
        res.status(406).send("error");
        return;
    })

} 


export default updateProfile_created;