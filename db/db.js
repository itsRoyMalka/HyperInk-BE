import mongoose from "mongoose";

export const dbConnect = async () =>{

    try{

       
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

    }catch(error){
        console.log(error)
    }

}

