const express = require("express")
const router = express.Router()
const db = require("./db")

//================================================ KARYAWAN ================================================
//akses data karyawan
router.get("/karyawan", (req,res) => {

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
        password : req.body.password
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