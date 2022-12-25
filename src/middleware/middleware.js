const { createCustomer,getCustomer, deleteCustomer, createCard, getCard } = require("../controller/controller")

exports.Customer = async function(req,res){
    try {
        let {create,get,Delete}=req.body
        if(!create && !get  && !Delete)return res.status(400).send({status:false,message:"Pls provide what you want to do - (create or get or Delete)"})
        if(create == "yes"){
            createCustomer(req,res)
        }
        else if(get=="yes"){
            getCustomer(req,res)
        }
        else if(Delete=="yes"){
            deleteCustomer(req,res)
        }
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

exports.card = async function(req,res){
    try {
        let {create,get}=req.body
        if(!create && !get )return res.status(400).send({status:false,message:"Pls provide what you want to do - (create or get)"})
        if(create=="yes"){
            createCard(req,res)
        }else if(get=="yes"){
            getCard(req,res)
        }
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}