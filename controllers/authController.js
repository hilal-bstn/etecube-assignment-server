const Jwt = require('jsonwebtoken');
const jwtKey = "process-management";

const User = require("../models/userModel");


const signUp = async (req, resp) => {
    const request = req.body.register;

    if (request.password && request.email && request.username) {
        try {
            const user = new User(req.body.register);
            const result = await user.save();

            if (result) {
                const userWithoutPassword = { ...result.toObject() };
                delete userWithoutPassword.password;

                Jwt.sign({ user: userWithoutPassword }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        return resp.send("Something went wrong, please try again later");
                    }
                    return resp.send({ result: userWithoutPassword, auth: token });
                });
            } else {
                return resp.send({ result: 'No user found' });
            }
        } catch (error) {
            console.error("Error:", error);
            return resp.status(500).send("Internal Server Error");
        }
    } else {
        return resp.send({ result: 'No user found' });
    }
};

const signIn = async (req, resp) => {
    const request = req.body.login;

    if(request.password && request.email)
    {
       let user=await User.findOne(request).select("-password");
        if(user)
        {
            Jwt.sign({ user },jwtKey,{ expiresIn: "2h" },(err,token)=>{
                    if(err){
                       return resp.send("Something went wrong, please trg after sometime")
                    }
              return  resp.send({ user,auth : token})
            })
        }
        else{
          return  resp.send({result:'No user found'})
        }
    }
    else
    {
        return resp.send({result:'No user found'})
    }
};

    const totalUser = async (req, resp) => {
    try {
      let usersCount = await User.countDocuments({});
      return resp.send({ usersCount });
    } catch (error) {
      return resp.status(500).send({ error: "Internal Server Error" });
    }
  };

  const newUsers = async (req, resp) => {
    try {
        let users = await User.find().sort({ "_id": -1 }).limit(3);

        if (users.length > 0) {
            return resp.send(users);
        } else {
            return resp.send([]);
        }
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = {
    signUp,
    signIn,
    totalUser,
    newUsers
}