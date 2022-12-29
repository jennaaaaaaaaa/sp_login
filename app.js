const express = require("express")
const app = express()
const port = 9000

app.post('/login', (req, res) => {
    res.send('login')
})

app.post('/loout', (req, res) => {
    res.send('loout')
})
app.post('/register', (req, res) => {
    res.send('register')
})
app.get('/users', (req, res) => {
    res.send('users')
})

app.listen(port, () => {
    console.log(port, '포트로 서버 열림')
})