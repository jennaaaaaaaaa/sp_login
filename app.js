const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const port = 9000

app.use(cookieParser())
app.use(express.json())

const users = [
    {name: "A", id:'aaa', password: "1234"},
    {name: "B", id:'bbb', password: "5678"}
]

app.get('/login', (req,res) => {
    // console.log(req.query)
    // const id = req.body.id
    // const password = req.body.password

    const id = req.query.id
    const password = req.query.password
    const user = users.find(user => user.id === id)
    console.log(user)

    if(!user){
        return res.send("너 누구니?")
    }

    if (user.password !== password) {
        return res.send("비밀번호 확인해라")
    }

    res.cookie('user-id', user.id)
    res.send("로그인")

})

app.get('/logout', (req,res) => {
    res.clearCookie("user-id")
    res.send("로그아웃")
})

app.get('/register', (req,res) => {
    const id = req.query.id
    const password = req.query.password
    const name = req.query.name

    const user = users.find(user => user.id === id)
    if(user) {
        return res.send("중복아이디 입니다.")
    }

    users.push({id, password, name})
    console.log(users)
    res.send("회원가입")
})

app.get('/users', (req,res) => {
    const id = req.cookies["user-id"]
    if (!id) {
        return res.send("로그인 해주세요")
    }

    const user = users.find(user => user.id === id)
    if(!user) {
        return res.send("회원 정보가 잘못 되었습니다")
    }
    res.send(user)

})

// app.post('/login', (req, res) => {
//     users.find(user => {
//         return user.id === id && user.password
//     })

//     console.log("header", `user_id=${user.id}`)
//     res.writeHead("Set-Cookie", `user_id=${user.id}`)
//     res.send('login')
// })

// app.post('/logout', (req, res) => {
//     res.send('logout')
// })
// app.post('/register', (req, res) => {
//     res.send('register')
// })
// app.get('/users', (req, res) => {

//     console.log(req.cookies.test1)
//     console.log(req.cookies.test2)
//     res.send('users')
// })

app.listen(port, () => {
    console.log(port, '서버 실행')
})