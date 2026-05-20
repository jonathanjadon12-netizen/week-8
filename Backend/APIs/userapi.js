import exp from "express";
import { UserModel } from "../Models/UserModel.js";

const userAPI = exp.Router();

// CREATE USER
userAPI.post(["/user", "/users"], async (req, res) => {
  let newUser = req.body;
  let newUserDoc = new UserModel(newUser);
  await newUserDoc.save();
  res.status(201).json({ message: "user created", payload: newUserDoc });
});

// READ ALL USERS
userAPI.get(["/user", "/users"], async (req, res) => {
  let userList = await UserModel.find();
  res.status(200).json({ message: "users", payload: userList });
});

// READ USER BY ID
userAPI.get("/users/:id", async (req, res) => {
  let uid = req.params.id;
  let user = await UserModel.findById(uid);
  res.status(200).json({ message: "user found", payload: user });
});

// DELETE USER BY ID
userAPI.delete("/users/:id", async (req, res) => {
  let uid = req.params.id;
  let user=await UserModel.findByIdAndDelete(uid,{$set:{status:false}});
  //check user
  if(!user){;
    return res.status(201).json({message:"user deleted",payload:user})
  }
  res.status(200).json({ message: "user deleted" });
});

// UPDATE USER BY ID
userAPI.put("/users/:id", async (req, res) => {
  let uid = req.params.id;
  let modifiedUser = req.body;

  let updatedUser = await UserModel.findByIdAndUpdate(
    uid,
    { $set: modifiedUser },
    { new: true }
  );
  res.status(200).json({ message: "user updated", payload: updatedUser });
});
//Activate  User (change status to true)
//put (complete change )and Patch(partial change )
userAPI.patch("/users/:id",async (req,res)=>{
   let uid = req.params.id;
  let modifiedUser = req.body;

  let user = await UserModel.findByIdAndUpdate(
    uid,
    { $set: modifiedUser },
    { new: true }
  );
  res.status(200).json({ message: "user activated", payload: user });
})

export default userAPI;