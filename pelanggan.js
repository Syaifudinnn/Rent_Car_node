const express = require("express")
const router = express.Router()
const db = require("./db")

//================================================ PELANGGAN ================================================
//akses data pelanggan
router.get("/pelanggan", (req,res) => {

    let sql = "select * from pelanggan"

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
                pelanggan : result
            }
        }
        res.json(response)
    })

})

//akses data pelanggan id tertentu
router.get("/pelanggan/:id", (req,res) => {

    let data = {
        id_pelanggan: req.params.id
    }

    let sql = "select * from pelanggan where ?"

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
                pelanggan : result
            }
        }
        res.json(response)
    })

})

//menambah data pelanggan
router.post("/pelanggan", (req,res) => {
    
    let data = {
        nama_pelanggan : req.body.nama_pelanggan,
        alamat_pelanggan : req.body.alamat_pelanggan,
        kontak : req.body.kontak
    }

    let sql = "insert into pelanggan set ?"

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

//mengubah data pelanggan
router.put("/pelanggan", (req,res) => {

    let data = [
        {
            nama_pelanggan : req.body.nama_pelanggan,
            alamat_pelanggan : req.body.alamat_pelanggan,
            kontak : req.body.kontak
        },

        {
            id_pelanggan : req.body.id_pelanggan
        }
    ]

    let sql = "update pelanggan set ? where ?"

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

//menghapus data pelanggan
router.delete("/pelanggan/:id", (req,res) => {
    let data = {
        id_pelanggan : req.params.id
    }

    let sql = "delete from pelanggan where ?"

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