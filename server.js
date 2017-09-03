var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000

app.use(express.static(__dirname + '/dist'))
app.use(function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})
app.listen(port)
console.log('Server started on port ', port)
