const express = require("express")
const router = express.Router()
const db = require("./db")
const multer = require("multer")
const path = require("path")
const fs = require("fs") 

router.use(express.static(__dirname));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

//================================================ MOBIL ================================================
//akses data mobil
router.get("/mobil", (req,res) => {

    let sql = "select * from mobil"

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
                mobil : result
            }
        }
        res.json(response)
    })

})

//akses data mobil id tertentu
router.get("/mobil/:id", (req,res) => {

    let data = {
        id_mobil: req.params.id
    }

    let sql = "select * from mobil where ?"

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
                mobil : result
            }
        }
        res.json(response)
    })

})

//menambah data mobil
router.post("/mobil", upload.single("image"), (req,res) => {
    
    let data = {
        nomor_mobil : req.body.nomor_mobil,
        merk : req.body.merk,
        jenis : req.body.jenis,
        warna : req.body.warna,
        tahun_pembuatan : req.body.tahun_pembuatan,
        biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
        image : req.file.filename
    }

    if (!req.file) {
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } 
    else {
        let sql = "insert into mobil set ?"

        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message: result.affectedRows + " data berhasil disimpan"
            })
        })
    }

})

//mengubah data mobil
router.put("/mobil", (req,res) => {

    let data = null, sql = null
    let param = { kode_barang: req.body.kode_barang }

    if (!req.file) {
        data = {
            nomor_mobil : req.body.nomor_mobil,
            merk : req.body.merk,
            jenis : req.body.jenis,
            warna : req.body.warna,
            tahun_pembuatan : req.body.tahun_pembuatan,
            biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
        }
    } 
    else {
        data = {
            nomor_mobil : req.body.nomor_mobil,
            merk : req.body.merk,
            jenis : req.body.jenis,
            warna : req.body.warna,
            tahun_pembuatan : req.body.tahun_pembuatan,
            biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
            image : req.file.filename
        }

        let sql = "select * from mobil where ?"

        db.query(sql, param, (err, result) => {

            if (err) throw err

            let fileName = result[0].image

            let dir = path.join(__dirname,"image",fileName)
            fs.unlink(dir, (error) => {})
        })

    }

    sql = "update mobil set ? where ?"

    db.query(sql, [data,param], (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil diubah"
            })
        }
    })

})

module.exports = router