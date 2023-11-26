const express = require('express');
const productRouter = express.Router();
const Products = require('../models/productModel');
const xlsx = require('xlsx');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for file
const upload = multer({ storage: storage });

// Express route to import data
productRouter.post('/importData', upload.single('file'), async (req, res) => {
    try {
        // Check if a file is provided in the form data
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Get the buffer of the uploaded file
        const fileBuffer = req.file.buffer;

        // Get the sheet number from the query parameters or default to the first sheet
        const sheetNumber = req.body.sheetNumber || 0;

        // Load the Excel file from the buffer
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

        // Choose the sheet based on the provided sheet number
        const sheetName = workbook.SheetNames[sheetNumber];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        // Save each row to the MongoDB database
        for (const row of jsonData) {
            const newData = new Products(row);
            await newData.save();
        }

        res.status(200).send('Data imported successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all records
productRouter.get('/products', async (req, res) => {
    try {
        // Fetch all records from the Products collection
        const allRecords = await Products.find();

        res.status(200).json(allRecords);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Express route to get sheet names from the uploaded Excel file
productRouter.post('/getSheetNames', upload.single('file'), (req, res) => {
    try {
        // Check if a file is provided in the form data
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Get the buffer of the uploaded file
        const fileBuffer = req.file.buffer;

        // Load the Excel file from the buffer
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

        // Get sheet names from the workbook
        const sheetNames = workbook.SheetNames;

        res.status(200).json(sheetNames);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = productRouter;
