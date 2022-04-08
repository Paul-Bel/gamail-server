const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN || 'test'
const smtp_password = process.env.SMTP_PASSWORD || 'test'

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/test', (req, res) => {
    res.send(`test success ${smtp_login} and ${smtp_password} and` )
})
app.post('/sendMessage', async (req, res) => {
    let {from, subject, text} = req.body

    let info = await transporter.sendMail({
        from: `${from}"👻" <foo@example.com>`, // sender address
        to: "pn.beloborodov.msk@gmail.com", // list of receivers
        subject: subject, // Subject line
        text: '', // plain text body
        html: `<b>You have a new message from HR</b><div>${text}</div><div>Contact: ${from}</div>`, // html body
    });

    res.send(`message delivered`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
