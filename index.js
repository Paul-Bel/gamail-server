const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = 3010

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hrsendmessage@gmail.com", // generated ethereal user
        pass: "hrSendMessageG2022", // generated ethereal password
    },

});

app.get('/', (req, res) => {
    res.send('Hello World!')
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
