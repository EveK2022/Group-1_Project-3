// const loginService = require("../services/login.service");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// class LoginController {
//     async create(req, res) {
//         const {username, email, password} = req.body;

//             const plainText = req.body.password;
//             bcrypt.hash(plainText, saltRounds, function (err, hash) {
//                 // A callback function called after hash() completes.
//                 if (err) {
//                 console.error(err);
//                 return;
//                 }
//                 console.log(hash);

//                 newUser.hash = hash;

//                 const hashedValue = hash;
//                 bcrypt.compare(plainText, hashedValue, function (err, result) {
//                 //console.log(`compare ${plainText} against ${hashedValue}`);
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }

//                 console.log(result);
//                 });
        
//         const { status, data, message } = 
//             await loginService.create(
//                 username,
//                 email,
//                 password
//             );

//             res.status(status);
//             res.json({ message, data });

//         },
//     )}
// }

// module.exports = LoginController;