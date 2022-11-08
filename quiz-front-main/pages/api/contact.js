export default function (req, res) {
    require('dotenv').config();

    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "zizudana32@gmail.com",
          pass: "zfmwhxpaqycjcfke",
        },
    });

    const mailData = {
        from: "위드스터디",
        to: req.body.email_input,
        subject: "위드스터디 이메일 인증 메일입니다.",
        text: "오른쪽 숫자 6자리를 입력해주세요 : " + req.body.number
    }
  
    transporter.sendMail(mailData, (err, info) => {
        if(err){
          console.log(err);
        } else {
          console.log(info);
        }
    })
    
    console.log(req.body)
    res.send('success')
  }