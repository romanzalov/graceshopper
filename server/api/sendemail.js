const nodemailer = require ('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: 'importsportsllc@gmail.com',
        pass: 'importsports123'
    },
    tls: {
        rejectUnauthorized: false
    }
});

let statusUpdate = {
    from: '"Import Sports LLC" <importsportsllc@gmail.com>',
    to: 'importsportsllc@gmail.com',
    subject: 'Order status update',
    text: 'Your order status has been updated to: '
};


let confirmed = {
    from: '"Import Sports LLC" <importsportsllc@gmail.com>',
    to: 'importsportsllc@gmail.com',
    subject: 'Order purchase confirmation',
    text: 'This is a confirmation email regarding your purchase!'
};

let shipped = {
    from: '"Import Sports LLC" <importsportsllc@gmail.com>',
    to: 'importsportsllc@gmail.com',
    subject: 'Your Order has shipped',
    text: 'Your order has shipped!'
};

let updated = {
    from: '"Import Sports LLC" <importsportsllc@gmail.com>',
    to: 'importsportsllc@gmail.com',
    subject: 'Order Updated',
    text: 'Your order has been updated!'
};


// const confirmedEmail = transporter.sendMail(confirmed, (error,info) => {
//     if(error) {
//         console.log(error);
//     }
//     console.log('The message was sent!');
//     console.log(info);
// });

// const deliveredEmail = transporter.sendMail(updated, (error,info) => {
//     if(error) {
//         console.log(error);
//     }
//     console.log('The message was sent!');
//     console.log(info);
// });

// const shippedEmail = transporter.sendMail(shipped, (error,info) => {
//     if(error) {
//         console.log(error);
//     }
//     console.log('The message was sent!');
//     console.log(info);
// });

let sendMail = function(input) {
    transporter.sendMail(input, (error,info) => {
        if(error) {
            console.log(error);
        }
        console.log('The message was sent!');
        console.log(info);
    }); 
    // return
}

module.exports = {
    // confirmedEmail,
    // deliveredEmail,
    // shippedEmail,
    sendMail,
    confirmed,
    updated,
    shipped,
    statusUpdate,
}