const {Users} = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")

const createUser = async (req, res)=>{
    try {
        const {username, email, password} = req.body
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const resp = await Users.create({
            username, 
            email,
            password : hashedPassword
        })
        res.status(200).json({
            msg : "Success create user",
            resp
        })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

const getUser = async (req, res)=>{
    try {
        const {id} = req.params
        const user = await Users.findOne({id})
        res.status(200).json({
            msg : "success",
            user
        })
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }
}

const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await Users.findOne({
            where : {
                email : email
            },
            attributes : [
                "id",
                "username",
                "email",
                "avatar",
                "password"
            ]
        })
        if(!user){
            return res.status(404).json({
                msg : "User not found"
            })
        }
        const hashedPassword = user?.dataValues?.password
        const match = await bcrypt.compare(password, hashedPassword)
        if(!match){
            return res.status(400).json({
                msg : "Wrong email or password"
            })
        }
        const token = jwt.sign({email}, "secretkey", {
            expiresIn : '1d'
        } )
        res.status(200).json({
            msg : "Login success",
            token,
            user
        })
    } catch (error) {
        console.log({error});
    }
}

const getAllUser = async (req, res)=>{
    const {username = ""} = req.query
    try {
        const data = await Users.findAll({
            where : {
                username : {[Op.like] :"%" + username + "%"}
            },
            attributes : ["id",'username', 'email', "avatar"]
        })
        res.status(200).json({
            msg : "Success",
            data
        })
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }
}

module.exports = {
    createUser,
    getUser,
    login,
    getAllUser
}