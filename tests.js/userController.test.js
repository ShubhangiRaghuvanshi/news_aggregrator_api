const user=require('../models/user');
const userController=require('../controllers/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { compare } = require('bcrypt');
jest.mock('../models/user');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');
describe('User Controller Test',()=>{
    let req,res;

    beforeEach(()=>{
        jest.clearAllMocks();
        req={
            body:{
                name:'testUser',
                email:'test@gmaul.com',
                password:'testPassword',
                preferences:['technology','sports']
            }
        };
        res={
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        };
    });
    it('should create a new user',async()=>{
       
        const createdUser={...req.body, _id:"mockId"};
        user.findOne.mockResolvedValue(null);
  
        user.create.mockResolvedValue(createdUser);
      await userController.registerUser(req,res);
        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({message:"User registered succesfully"});

 } );
 it('should login a  user',async()=>{
       
    user.findOne.mockResolvedValue({
        _id:"mockId",
        email:req.body.email,
        password:'hashedPassword'
});
bcrypt.compare.mockResolvedValue(true);
jwt.sign.mockReturnValue('token');
await userController.loginUser(req,res);
expect(res.status).toBeCalledWith(200);
expect(res.json).toBeCalledWith({message:"User Logged In ",token:'token'});
expect(user.findOne).toBeCalledWith({email:req.body.email});
expect(bcrypt.compare).toBeCalledWith(req.body.password,'hashedPassword');


  } );
  
});
