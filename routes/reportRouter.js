const express = require('express');
// const { ObjectId } = require('mongodb');
const reportRouter = express.Router();
const Report = require('../models/reportModel');

// Route to add new report 
reportRouter.post('/addreport', async (req, res) => {
    try {
        const newreport = new Report({
            supplier: req.body.supplier_id,
            products: req.body.products
        });

        // Save the new report member to the database
        const response= await newreport.save();

        if (response) {
            return res.status(200).json('work');
        } else {
            return res.status(500).send('not work');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send('An error occurred while adding the report member.');
    }
});

// // Route to retrieve all report
// reportRouter.get("/showreport", async (req, res) => {
//     try {
//         const results = await report.find();
//         res.status(200).json({ result: results });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while retrieving the records.' });
//     }
// });





module.exports = reportRouter;