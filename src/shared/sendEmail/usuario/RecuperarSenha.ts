import nodemailer from "nodemailer"

class SendEmailRecuperarSenha {
    constructor(){}
    async execute(to: string, subject: string, html: string) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user : 'italoenviodeemail@gmail.com',
                pass: 'lvhi qoaj uflm kexd '
            }
        })

        await transport.sendMail({
            from: 'Time de suporte <italoenviodeemail@gmail.com>',
            to: to,
            subject : subject,
            html: html
        }).catch((err) => console.log(err))

    }
}

export { SendEmailRecuperarSenha };
