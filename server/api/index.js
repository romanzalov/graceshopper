const nodemailer = require('nodemailer');

const router = require('express').Router()

router.use('/users', require('./users'))

router.use('/products', require('./products'));

router.use('/reviews', require('./reviews'));

router.use('/product-instances', require('./productInstances'));

router.use('/orders', require('./orders'));

router.use('/categories', require('./categories'));

router.use('/session', require('./session'));

// router.use('/test-mailer', function(req, res) {
//     console.log('testing mailer');
//     nodemailer.createTestAccount((err, account) => {
//       // create reusable transporter object using the default SMTP transport
//       let transporter = nodemailer.createTransport({
//           host: 'smtp.ethereal.email',
//           port: 587,
//           secure: false, // true for 465, false for other ports
//           auth: {
//               user: account.user, // generated ethereal user
//               pass: account.pass // generated ethereal password
//           }
//       });
//       // setup email data with unicode symbols
//       let mailOptions = {
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: 'matthewchan2147@gmail.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//       };
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
//   }); 
// res.json("test");
// });


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router
