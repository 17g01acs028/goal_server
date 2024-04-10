import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

console.log(req.body);

    if(Object.keys(req.body).length === 0 || email==="" || password === "" || lastName === "" || firstName === "") {return res.status(400).json({msg:"All fields required"})}

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role:"",
      location:"",
      occupation:"",
      status:"pending"
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const pass = req.body.password;

    if(email==="" || pass === "") return res.status(400).json({msg:"All fields required"})

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    if(user.status === "pending" || user.status === "" || user.status === null){
      return res.status(400).json({ msg: "Please request you admin to approve you. " });
    }

    if(user.status === "blocked"){
      return res.status(400).json({ msg: "You are Blocked from using this system, Please request admin to ublock you. " });
    }



    const token = jwt.sign({ id: user._id }, "steve");

    user.password = "";
    console.log(user);
   
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Login 2
const login2 = (req, res) => {
  // Destructuring username & password from body
  const { username, password } = req.body;

  // Checking if credentials match
  if (username === userCredentials.username &&
      password === userCredentials.password) {

      //creating a access token
      const accessToken = jwt.sign({
          username: userCredentials.username,
          email: userCredentials.email
      }, "steve", {
          expiresIn: '10m'
      });
      // Creating refresh token not that expiry of refresh 
      //token is greater than the access token

      const refreshToken = jwt.sign({
          username: userCredentials.username,
      }, "steve", { expiresIn: '1d' });

      // Assigning refresh token in http-only cookie 
      res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'None', secure: true,
          maxAge: 24 * 60 * 60 * 1000
      });
      return res.json({ accessToken });
  }
  else {
      // Return unauthorized error if credentials don't match
      return res.status(406).json({
          message: 'Invalid credentials'
      });
  }}
/* Refresh Token */
export const refresh = async (req, res) => {
  if (req.cookies?.jwt) {

    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;

    // Verifying refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          // Wrong Refesh Token
          return res.status(406).json({ message: 'Unauthorized' });
        }
        else {


          // Correct token we send a new access token
          const accessToken = jwt.sign({
            username: userCredentials.username,
            email: userCredentials.email
          }, "steve", {
            expiresIn: '10m'
          });
          return res.json({ accessToken });
        }
      })
  } else {
    return res.status(406).json({ message: 'Unauthorized' });
  }
}