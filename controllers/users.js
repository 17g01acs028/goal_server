import User from "../models/User.js";
import bcrypt from "bcrypt";


/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id,{deleted:false});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({deleted:false});
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      password,
      newPassword
    } = req.body;

    if (
      Object.keys(req.body).length === 0 ||
      password === "" ||
      newPassword === "" 

    ) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Wrong session Data Please Login again" });
    }
    console.log(password);
    console.log(user.password)

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Incorrect Old password" });
    }

    console.log(password);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    const updatedUserPassword = await User.updateOne(
      { _id: id },
      {
        $set: {
          password: passwordHash,
        },
      }
    );

    res.status(200).json(updatedUserPassword);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      email,
      status,
      location,
      occupation,
      role,
    } = req.body;

    if (
      Object.keys(req.body).length === 0 ||
      role === "" ||
      occupation === "" ||
      status === "" ||
      email === "" ||
      location === "" ||
      lastName === "" ||
      firstName === ""
    ) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const updatedUser = await User.updateOne(
      { _id: id },
      {
        $set: {
          firstName,
          lastName,
          email,
          role,
          location,
          occupation,
          status,
        },
      }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndUpdate({ _id: id,deleted:true });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      status,
      location,
      occupation,
      role,
    } = req.body;

    console.log(req.body);
    if (Object.keys(req.body).length === 0 || role === "" || occupation === "" || status === "" || email === "" || lastName === "" || firstName === "") { return res.status(400).json({ msg: "All fields required" }) }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash("1234", salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role,
      location,
      occupation,
      status,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
}


