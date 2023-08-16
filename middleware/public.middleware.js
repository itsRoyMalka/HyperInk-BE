

export const verifyPublic =async (req, res,next)=>{

    try{

        next()

    }catch(error){
        res.status(500).json({error: error.message})

    }

}