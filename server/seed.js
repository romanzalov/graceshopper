// const Product = db.define('product', {
//     sportType: {
//       type: Sequelize.ENUM,
//       values: ['Football', 'Basketball', 'Baseball', 'Combat Sports', 'Tennis', 'Soccer', 'Hockey', 'Volleyball', 'Snowboarding', 'Swimming'],
//       allowNull: false,
//     },
//     title: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     quantity: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: Sequelize.DECIMAL,
//       defaultValue: 0,
//     }
// })

var Products = [
    {
        sportType: 'Football',
        title: 'Shoulder Pads',
        quantity: 7,
        price: 23.00,
    },
    {
        sportType: 'Football',
        title: 'Helmet',
        quantity: 6,
        price: 35.00,
    },
    {
        sportType: 'Soccer',
        title: 'Soccer Ball',
        quantity: 3,
        price: 50.00,
    },
    {
        sportType: 'Basketball',
        title: 'Basketball Shoes',
        quantity: 13,
        price: 250.00,
    },
    {
        sportType: 'Combat Sports',
        title: 'Boxing Gloves',
        quantity: 4,
        price: 80.00,
    },
    {
        sportType: 'Swimming',
        title: 'Speedo',
        quantity: 200,
        price: 2.00,
    },
    {
        sportType: 'Football',
        title: 'Cleats',
        quantity: 4,
        price: 150.00,
    },
    {
        sportType: 'Hockey',
        title: 'Hockey Puck',
        quantity: 9,
        price: 5.00,

    },
    {
        sportType: 'Baseball',
        title: 'Baseball Bat',
        quantity: 6,
        price: 100.00,
    },
    {
        sportType: 'Volleyball',
        title: 'Girls Volleyball Shorts',
        quantity: 15,
        price: 8.00,
    }
];