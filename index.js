const fs = require('fs')
const pdfParser = require('pdf-parse');
const pdfBuffer = fs.readFileSync('./invoice.pdf')

pdfParser(pdfBuffer).then(data=>{
  const text = data.text
  const vendorName = text.match(/^(\w.*)$/m)[0]
  const email = text.match(/Email: (.*)/m)[1]
  const invoiceDate = text.match(/Invoice Date: (.*)/m)[1]
  const printDate = text.match(/Print Date: (.*)/m)[1]
  const paymentDate = text.match(/Payment Date: (.*)/m)[1]
  const exchangeRate = text.match(/Exchange Rate: (.*)/m)[1]
  const customerNumber = text.match(/Customer Number: (.*)/m)[1]
  const orderId = text.match(/Order ID: (.*)/m)[1]
  const payReferrance = text.match(/Pay Reference: (.*)/m)[1]
  const obj = {
    vendorName, email, invoiceDate, printDate, paymentDate,
    exchangeRate, customerNumber, orderId, payReferrance
  }
  console.log(obj, 'pdf obj')
})