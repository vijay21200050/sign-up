const res = require("express/lib/response");

const bcrypt = require('bcrypt')

function userExist(data , username, password) {
    var data_size = data.length
    if (data_size == 0){
        return false;
    }

    // console.log(data)

    for(var i=0;i<data_size;i++){
        if (data[i].username === username) {
            if(bcrypt.compareSync(password, data[i].password)){
                message: data[i].username
                return true;
            }
            else {
                console.log('Wrong Password')
                return false;
            }
        }
    }
}

module.exports = userExist