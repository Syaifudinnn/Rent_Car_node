const express = require("express")
const router = express.Router()
const md5 = require("md5")
const Cryptr = require("cryptr")
const crypt = new Cryptr("140533601726") 

const db = require("./db")

validateToken = () => {
    return (req, res, next) => {

        if (!req.get("Token")) {
            res.json({
                message: "Access Forbidden"
            })
        } 
        else {
            let token  = req.get("Token")
            
            // decrypt token menjadi id_user
            let decryptToken = crypt.decrypt(token)

            // sql cek id_user
            let sql = "select * from karyawan where ?"

            // set parameter
            let param = { id_karyawan: decryptToken}

            // run query
            db.query(sql, param, (error, result) => {
                if (error) throw error
                if (result.length > 0) {
                    next()
                } 
                else {
                    res.json({
                        message: "Invalid Token"
                    })
                }
            })
        }

    }
}

//================================================ KARYAWAN ================================================
//akses data karyawan
router.get("/karyawan", validateToken(), (req,res) => {

    let sql = "select * from karyawan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                karyawan : result
            }
        }
        res.json(response)
    })

})

//akses data karyawan id tertentu
router.get("/karyawan/:id", (req,res) => {

    let data = {
        id_karyawan: req.params.id
    }

    let sql = "select * from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                karyawan : result
            }
        }
        res.json(response)
    })

})

//menambah data karyawan
router.post("/karyawan", (req,res) => {
    
    let data = {
        nama_karyawan : req.body.nama_karyawan,
        alamat_karyawan : req.body.alamat_karyawan,
        username : req.body.username,
        password : md5(req.body.password) 
    }

    let sql = "insert into karyawan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })

})

// endpoint login karyawan (authentication)
router.post("/auth", (req, res) => {

    let param = [
        req.body.username,
        md5(req.body.password) 
    ]
    

    // create sql query
    let sql = "select * from karyawan where username = ? and password = ?"

    // run query
    db.query(sql, param, (error, result) => {
        if (error) throw error

        // cek jumlah data hasil query
        if (result.length > 0) {
            // karyawan tersedia
            res.json({
                message: "Logged",
                token: crypt.encrypt(result[0].id_karyawan), // generate token
                data: result
            })
        } else {
            // karyawan tidak tersedia
            res.json({
                message: "Invalid username/password"
            })
        }
    })
})

//mengubah data karyawan
router.put("/karyawan", (req,res) => {

    let data = [
        {
            nama_karyawan : req.body.nama_karyawan,
            alamat_karyawan : req.body.alamat_karyawan,
            username : req.body.username,
            password : req.body.password
        },

        {
            id_karyawan : req.body.id_karyawan
        }
    ]

    let sql = "update karyawan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })

})

//menghapus data karyawan
router.delete("/karyawan/:id", (req,res) => {
    let data = {
        id_karyawan : req.params.id
    }

    let sql = "delete from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })

})

module.exports = router
