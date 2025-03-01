const mongoose=require('mongoose');
const{MongoMemoryServer}=require('mongodb-memory-server');
const User=require('../models/user');
jest.setTimeout(30000)
require('dotenv').config();

describe('User Model Test',()=>{
    let mongoServer;
    beforeAll(async () => {
    mongoServer=await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

        });
        afterAll(async()=>{
            await mongoose.disconnect();
            await mongoServer.stop();
        });
        beforeEach(async()=>{
            await User.deleteMany();
        });

      
        afterEach(async()=>{
       console.log('Test Completed');
        });
   
        it('should create a new user',async()=>{
            const userData= ({
                name:'testUser',
                email:'testUser@gmail.com',
                password:'testPassword',
                preferences:['technology','sports']
            })
            const user =await User.create(userData);
            expect(user._id).toBeDefined();
            expect(user.name).toBe(userData.name);   
            expect(user.email).toBe(userData.email);
            expect(user.password).toBe(userData.password);
            expect(user.preferences).toStrictEqual(userData.preferences);
                

    

    });//closing of it
 
});


