import express from "express";

function createEndpoints(prefix, routes){

    const router = express.Router()

    try{

        routes.forEach(route=>{
             router[route.method](`/${route.endpoint}`, route.controller)
            //route.method.toLowerCase() === 'get' && router.get(`/${route.endpoint}`, route.controller)

        })

        return router


    }catch (error){
        console.log(error)
    }

}

export default createEndpoints