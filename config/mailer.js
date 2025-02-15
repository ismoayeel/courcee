import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "testotpn16@gmail.com",
        pass:  "zyhe vmzp llzh tbhc"
    },
});

async function sendMail(email, otp) {
    try {
        await transport.sendMail({
            to: email,
            subject: "One-Time Password (OTP)",
            text: `Your verification code is: ${otp}`,
        });
    } catch (error) {
        console.console.log(error);
    }
}

export default sendMail;
