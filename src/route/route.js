const express = require('express')
const { Customer, card } = require('../middleware/middleware')
const router = express.Router()

router.get("/test-me",function(req,res){
    res.send("This is the test API")
})

router.post('/customer',Customer)
router.post('/card',card)

module.exports = router