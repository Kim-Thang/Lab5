const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const userController = {
    createUser: async(req, res) => {
        try {

            const {name, email, password, phone} = req.body;
            const user = await Users.findOne({email})
            if(user) {
                res.status(400).json({msg: 'Email này đã tồn tại'});
            };
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new Users(
                {
                    name,
                    email,
                    password: hashPassword,
                    phone
                }
            );
            await newUser.save();
            res.status(200).json({ message: 'Tạo tài khoản thành công !' });
            // console.log(req.body)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
 
    getAll: async (req, res) => {
        try {
            const user = await Users.find();
            res.json(user);
        } catch {
            return res.status(500).json({ msg: error.msg });
        };
    },

    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id);
            res.json({msg: "Xóa tài khoản thành công"});

        } catch (error) {
            return res.status(500).json({ msg: error.msg });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { name, phone, address, email } = req.body;
			await Users.findByIdAndUpdate(
				{
					_id: req.params.id
				},
				{
					name,
					phone,
					address,
					email
				}
			);
			res.json({ msg: 'Cập nhật tài khoản thành công' });
        } catch (error) {
            return res.status(500).json({ msg: error.msg });
        }
    }
}

module.exports = userController