const nodemailer = require("nodemailer")



async function sendMail({ email, subject, html, title }) {

    const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "tucommers@gmail.com", // generated ethereal user
            pass: process.env.NODEMAILER_KEY, // generated ethereal password
        },
    });

    await transporter.verify()
        .then(result => {
            console.log("Ready to send email")
        }).catch(err => {
            console.log(err)
        })


    return await transporter.sendMail({
        from: `${title} 👻 <tucommers@gmail.com>`,
        to: email, // list of receivers
        subject, // Subject line
        html, // html body
    })
}



module.exports = { sendMail }