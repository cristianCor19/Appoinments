import User from "../models/user.js";
import {genSalt, hash, compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAccessToken } from "../libs/jwt.js";
import { configAdminFirebase } from "../firebase/configFirebase.js";

import admin from 'firebase-admin'



admin.initializeApp({
    credential: admin.credential.cert(configAdminFirebase)
})

export async function saveUser(req, res){
    try {
        const {idCardNumber, name, lastname, email, password, phone, role} = req.body
        const image = 'https://firebasestorage.googleapis.com/v0/b/test-firebase-a4d1d.appspot.com/o/images%2Fprofile-image.webp?alt=media&token=e5f92403-94c6-4749-9f11-6acd4e28ca13'
        const userFound = await User.findOne({ idCardNumber: idCardNumber})



        if(!userFound) {
            const salt = await genSalt(10)
            const hashedPassword = await hash(password, salt)
            const userReponseFirebase = await admin.auth().createUser({
                email: email,
                password: hashedPassword,
                emailVerified: false,
                disabled: false,
                
            })

            
            const newUser = new User({
                idCardNumber,
                name,
                lastname,
                email,
                password: hashedPassword,
                phone,
                image: image,
                role,
                uid: userReponseFirebase.uid
            })

            const userSaveData = await newUser.save()

            return res.status(200).json({
                "status": true,
                "message": 'User saved successfully'
            })
        }else{
            return res.status(500).json({
                "status": false,
                "error": error,
                "message": "Correo ya registrado"
            })
        }
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export async function loginUser(req, res){
    try {
        
        console.log('enter the login method');
        const {email, password} = req.body
        //sing in user to firebase authentication
        const userLoginFirebase = await admin.auth().getUserByEmail(email);
        const userFound = await User.findOne({ email: userLoginFirebase.email})
     

        if(!userFound){
            return res.status(404).json({
                "status": false,
                "message": "User not found"
            })
        }
        const passwordMatch = await compare(password, userFound.password)
        
         // generate a firebase session token
        //  const token = await admin.auth().createCustomToken(userLoginFirebase.uid);
        //generate a jwt session token

        const token = await createAccessToken({
            id: userFound._id, uid: userLoginFirebase.uid,
        })


        if (!passwordMatch) {
            return res.status(401).json({
                "status": false,
                "message": "Incorrect password"
            })
        }

        
        return res.status(200).json({
            "status": true,
            "data": {
                "uid": userLoginFirebase.uid,
                "email": userLoginFirebase.email,
                "_id": userFound._id,
                "token": token
            },
            "message": "Successful login",
            
        })
        
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })

    }
}

export async function profileUser(req, res){
    try {
        const token = req.params.token
        const decodedToken = jwt.decode(token)
        const idUser = decodedToken.id

        console.log(idUser);
        const userFound = await User.findById(idUser)

        if(!userFound) return res.status(404).json({
            "status": false,
            "message": 'User not found'
        })


        return res.status(200).json({
            message: 'User found successfully',
            data: {
                _id: userFound._id,
                name: userFound.name,
                lastname: userFound.lastname,
                email: userFound.email,
                phone: userFound.phone,
                image: userFound.image
            }
        })

    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export async function verifyToken(req, res) {
    try {
        const token = req.params.token
        if(!token) return res.status(401).json({
            'status': false,
            "message": "Not exist authorization"
        })

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) =>{
            if(err) return res.status(401).json({
                'status': false,
                "message": 'Not exist authorization'
            })

            const userFound = await User.findById(user.id)
            if(!userFound) return res.status(404).json({
                "status": false,
                "message": 'Not exist user'
            })

            return res.status(200).json({
                "status": true,
                "message": 'Exist authorization'
            })
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error
        })
    }

}

export async function updateImageUser(req, res){
    try {
        
    } catch (error) {
        
    }
}

