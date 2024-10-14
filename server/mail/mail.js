const nodemailer = require("nodemailer")


const mailSend = (subject , text , email)=>{


const auth = nodemailer.createTransport({
    service: "gmail",
    secure : true,
    port : 465,
    auth: {
        user: "ankushjagga97@gmail.com",
        pass: "smmw fjqz itzi wuvk"

    }
});

const receiver = {
    from : "ankushjagga97@gmail.com",
    to : email,
    subject : subject,
    text : text
};

  auth.sendMail(receiver, (error, emailResponse) => {
    if(error)
    throw error;
    console.log(emailResponse);
    response.end();
});
}


module.exports = mailSend
