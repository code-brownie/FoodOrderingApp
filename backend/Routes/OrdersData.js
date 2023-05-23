const express = require('express');
const routes = express.Router();
const Orders = require('../models/Orders');
routes.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let email_Id = await Orders.findOne({ email: req.body.email })
    console.log(email_Id);
    if (email_Id == null) {
        try {
            await Orders.create({
                email: req.body.email,
                order_data: [data],
            }).then(() => {
                res.json({ success: true });
            })
        } catch (error) {
            console.log(error.messasge);
            res.send("Server error", error.message);
        }
    } else {
        try {
            await Orders.findOneAndUpdate({ email: req.body.email },
                {
                    $push: { order_data: data }
                }).then(() => {
                    res.json({ success: true });
                })
        }
        catch (error) {
            res.send("server error", error.message);
        }
    }
})

routes.post('/myOrders', async (req, res) => {
    try {
        let Myorder = await Orders.findOne({ "email": req.body.email });
        res.json({ orderData: Myorder });
    } catch (error) {
        res.send("server error", error.message);
    }

})
module.exports = routes;