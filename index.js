const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5555 || process.env.PORT
const fileUpload = require('express-fileupload')
const fs = require('fs')
const pdfParser = require('pdf-parse');
const pdfBuffer = fs.readFileSync('./invoice2.pdf')

app.use(cors())
app.use(fileUpload())

function parsePdf(req, res){
  const pdfBuffer = req.files.file.data
  pdfParser(pdfBuffer).then(data=>{
    const text = data.text
    const vendorName = text.match(/^(\w.*)$/m)[0]
    const email = text.match(/Email: (.*)/m)?.[1]
    const invoiceDate = text.match(/Invoice Date: (.*)/m)?.[1]
    const printDate = text.match(/Print Date: (.*)/m)?.[1]
    const paymentDate = text.match(/Payment Date: (.*)/m)?.[1]
    const exchangeRate = text.match(/Exchange Rate: (.*)/m)?.[1]
    const customerNumber = text.match(/Customer Number: (.*)/m)?.[1]
    const orderId = text.match(/Order ID: (.*)/m)?.[1]
    const payReferrance = text.match(/Pay Reference: (.*)/m)?.[1]
    const extractedData = {
      vendorName, email, invoiceDate, printDate, paymentDate,
      exchangeRate, customerNumber, orderId, payReferrance
    }
    res.send(extractedData)
  })
}

app.post('/invoice', parsePdf)
app.listen(PORT, ()=>{
  console.log('Server is  running with port '+ PORT)
})