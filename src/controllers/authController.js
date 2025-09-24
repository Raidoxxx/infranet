const ad = require("../config/activeDirectory");
 
 exports.user_authenticate = async (req, res) => {
   const { user, pass, domain } = req.body;
   try {
     await ad.authenticate( domain + "\\" + user, pass,
      function (err, auth) {
        if (auth) {
          return res.status(200).json({
                message: "Authenticated!"
              });
          }
        else {
          return res.status(401).send({
              message: "Authentication failed!",
              error: err
          });
       }
      });
    }catch (err) {
    return res.status(500).send({ message: "ERROR " + err });
   }
 };