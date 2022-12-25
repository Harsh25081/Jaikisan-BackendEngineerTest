const mongoose=require('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber:{type:String,required:true},
    cardType:{type:String,required:true,enum:['REGULAR','SPECIAL']},
    customerName:{type:String,required:true},
    status:{type:String,default:"ACTIVE",enum:['ACTIVE','INACTIVE']},
    vision:{type:String},
    customerID:{type:String,required:true,ref:'Customer'}
})

module.exports=mongoose.model('Card',cardSchema)