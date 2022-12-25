const customerModel = require('../models/customerModel')
const cardModel = require('../models/cardModel')
const { v4: uuidv4 } = require('uuid')

let validMobile = /[6-9]\d{9}$/
let validDOB = /^\d{4}-\d{2}-\d{2}$/
let validemailId = /^([a-zA-Z0-9_\.\-])+\@([a-z])+\.([a-z]{2,3})$/i

//========================================= CREATE CUSTOMER ==========================================//
exports.createCustomer = async (req, res) => {
    try {
        let customerDetails = req.body
        let { firstName, lastName, mobileNumber, DOB, emailID, address, status } = customerDetails
        if(!firstName)return res.status(400).send({status:false,message:"Pls provide firstName"})
        if(!lastName)return res.status(400).send({status:false,message:"Pls provide lastName"})
        if(!mobileNumber)return res.status(400).send({status:false,message:"Pls provide mobileNumber"})
        if(!validMobile.test(mobileNumber))return res.status(400).send({status:false,message:"Pls provide a valid mobile no."})
        if(!DOB)return res.status(400).send({status:false,message:"Pls provide DOB"})
        if(!validDOB.test(DOB))return res.status(400).send({status:false,message:"Pls provide a valid DOB"})
        if(!emailID)return res.status(400).send({status:false,message:"Pls provide emailID"})
        if(!validemailId.test(emailID))return res.status(400).send({status:false,message:"Pls provide a valid emailID"})
        if(!address)return res.status(400).send({status:false,message:"Pls provide address"})
        if(!status)return res.status(400).send({status:false,message:"Pls provide status"})
        if(!["ACTIVE","INACTIVE"].includes(status))return res.status(400).send({status:false,message:"Pls provide status only from - ( ACTIVE , INACTIVE )"})
        customerDetails.customerID = uuidv4()
        let customerData = await customerModel.create(customerDetails)
        return res.status(201).send({ status: true, data: customerData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//========================================== GET CUSTOMER ================================================//
exports.getCustomer=async (req,res)=>{
    try {
        let getData= await customerModel.find({status:"ACTIVE"})
        return res.status(200).send({status:true,data:getData})
        
    } catch (error) {
        return response.status(500).send({ status: false, message: error.message })
    }
}

//========================================== DELETE CUSTOMER ===============================================//
exports.deleteCustomer = async (req,res)=>{
    try {
        let {customerID}=req.body
        if(!customerID)return res.status(400).send({status:false,message:"Pls provide CustomerID in body to delete"})
        let customerexists = await customerModel.findOne({customerID})
        if(!customerexists)return res.status(404).send({status:false,message:"No customer found with this given customerID"})
        await customerModel.deleteOne({customerID})
        return res.status(200).send({status:true})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------------------------- GET CARD -----------------------------------------------------//
exports.getCard = async function(req,res){
    try {
        let getCard = await cardModel.find()
        return res.status(200).send({status:true,data:getCard})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------------------------- CREATE CARD ----------------------------------------------------//
exports.createCard = async function(req,res){
    try {
        let data = req.body
        let getCard = await cardModel.find().count()
        let {cardNumber,cardType,customerName,status,vision,customerID} = data
        cardNumber = "C"+("00"+(getCard+1)).slice(-3)
        data.cardNumber = cardNumber
        if(!cardType)return res.status(400).send({status:false,message:"Pls provide CardType"})
        if(!["REGULAR","SPECIAL"].includes(cardType))return res.status(400).send({status:false,message:"Pls provide cardType only from - ( REGULAR , SPECIAL )"})
        if(!customerName)return res.status(400).send({status:false,message:"Pls provide customerName"})
        if(!status)return res.status(400).send({status:false,message:"Pls provide status"})
        if(!["ACTIVE","INACTIVE"].includes(status))return res.status(400).send({status:false,message:"Pls provide status only from - ( ACTIVE , INACTIVE )"})
        if(!customerID)return res.status(400).send({status:false,message:"Pls provide customerId"})
        let checkCustomerId = await customerModel.findOne({customerID})
        if(!checkCustomerId)return res.status(404).send({status:false,message:"No Customer exists with the given customerID"})
        let name = checkCustomerId.firstName + " " + checkCustomerId.lastName
        if(name!=customerName)return res.status(400).send({status:false,message:"Pls provide the customerID of given customerName not other's"})
        let createCard = await cardModel.create(data)
        return res.status(201).send({status:true,data:createCard})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
