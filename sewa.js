const express = require("express")
const router = express.Router()
const db = require("./db")
const moment = require("moment")

//================================================ SEWA ================================================
//end point menambahkan data sewa
router.post("/sewa", (req,res) => {
    
    let data = {
        id_pelanggan : req.body.id_pelanggan,
        id_karyawan : req.body.id_karyawan,
        waktu : moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let mobil = JSON.parse(req.body.mobil)

    let sql = "insert into sewa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            res.json({message : error.message})
        }
        else {
            let lastID = result.insertId
            let data = []
            for (let index = 0; index < mobil.length; index++) {
                data.push([
                    lastID, mobil[index].id_mobil
                ])
            }

            let sql = "insert into detail_sewa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message : error.message})
                }
                else {
                    res.json({message : "Data has been inserted"})
                }
            })

        }
    })

})

// end-point menampilkan data sewa
router.get("/sewa", (req,res) => {

    let sql = "select sewa.id_sewa, sewa.id_pelanggan, sewa.id_karyawan, sewa.waktu, karyawan.id_karyawan, karyawan.nama_karyawan, karyawan.alamat_karyawan, karyawan.username, pelanggan.id_pelanggan, pelanggan.nama_pelanggan, pelanggan.alamat_pelanggan, pelanggan.kontak from sewa join pelanggan on sewa.id_pelanggan = pelanggan.id_pelanggan join karyawan on sewa.id_karyawan = karyawan.id_karyawan"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                pelanggaran_siswa: result
            })
        }
    })
})



module.exports = router