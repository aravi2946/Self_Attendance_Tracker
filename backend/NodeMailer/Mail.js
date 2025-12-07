import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

})

const sendEmail = async (toEmail, toUser) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Welcome to our App",
            text: `Hi ${toUser}, Thanks for registering!`,
            html: `<h1>Welcome ${toUser}, Nice to see you</h1>`


        }, (err, info) => {
            if (err) {
                console.log("SMTP error",err);
                
            } else {
                
                console.log("Email sent Successfully",info);
            }
        })

    } catch (err) {
        console.error("Error in email", err)
    }
}

export default sendEmail;