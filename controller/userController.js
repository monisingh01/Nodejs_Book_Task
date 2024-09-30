import User from "../model/User.js";



export const createUser = async (req, res) => {
    const { name, email } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        const newUser = new User({ name, email })
        await newUser.save()

        res.status(201).json({ msg: 'User registered successfully' })
    }
    catch (error) {
        res.status(500).json(
            { error: error.message }
        )
    }
}




export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(
            { error: error.message }
        )
    }
}



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)

    }
    catch (error) {
        res.status(500).json(
            { error: error.message }
        )
    }
}