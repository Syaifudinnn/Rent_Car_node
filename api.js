const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const pelanggan_route = require("./pelanggan")
const karyawan_route = require("./karyawan")
const mobil_route = require("./mobil")
const sewa_route = require("./sewa")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(__dirname));
app.use(express.json())

app.use(pelanggan_route)
app.use(karyawan_route)
app.use(mobil_route)
app.use(sewa_route)

app.listen(5000, () => {
    console.log("barakallah");
})