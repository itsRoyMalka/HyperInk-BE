import createEndpoints from "./endpoints.js";



function createRouter (prefix, app, routes){

    try{
        routes.forEach(route=>{

            app.use(`/${prefix}/${route.api}`, route.middleware, createEndpoints(route.api,route.endpoints))
        })
    }catch (error){
        console.log(error)
    }


}

export default createRouter