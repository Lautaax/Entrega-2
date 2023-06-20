import nodemailer from "nodemailer";
import __dirname from "../utils.js";
import configMailSms from "../config/configmailsms.js";

const {
    nodemailerConfig: { service, port, user, password,mail_receptor},

  } = configMailSms;

const transport = nodemailer.createTransport({
    service: service,
    port: port,
    auth: {
        user: user,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
})
export async function sendEmail(req,res){
    const {email}=req.session.user

    let result = await transport.sendMail({
        from: user,
        to: email,
        subject: "Test mail",
        html: `
        <h1>This is a testing mail</h1>
        `,
        attachments: [{
            filename: '14360092_321312491563922_4116234985050996736_n.jpg',
            path: `${__dirname}/public/images/1681689464000-Micro-Procesador-Ryzen-5-4500-6-Nucleos-4.1ghz-Amd-Ddr4.png`,
            cid: 'hola1'
        }]
    })

    res.send({ status: "success", result: "mail sent" })
}