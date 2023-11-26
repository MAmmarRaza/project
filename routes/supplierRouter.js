const express = require('express');
// const { ObjectId } = require('mongodb');
const SupplierRouter = express.Router();
const Supplier = require('../models/supplierModel');

// Route to add new Supplier members
SupplierRouter.post('/addSupplier', async (req, res) => {
    try {
        const newSupplier = new Supplier({
            cnic: req.body.cnic,
            name: req.body.name,
            contact: req.body.contact,
            brand:req.body.brand,
            vehicleNo:req.body.vehicleNo
        });
        // Check if a Supplier member with the same email already exists
        const existingSupplier = await Supplier.findOne({ cnic: req.body.cnic });
        if (existingSupplier) {
            return res.status(409).send('Supplier member with the same cnic already exists.');
        }

        // Save the new Supplier member to the database
        const response= await newSupplier.save();

        if (response) {
            return res.status(200).json('work');
        } else {
            return res.status(500).send('not work');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send('An error occurred while adding the Supplier member.');
    }
});

// Route to retrieve all Supplier
SupplierRouter.get("/showSupplier", async (req, res) => {
    try {
        const results = await Supplier.find();
        res.status(200).json({ result: results });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the records.' });
    }
});



// Route to handle the update post form submission
SupplierRouter.post('/updateSupplier',async (req, res) => {
    try {
        let id = req.body.id;
        await Supplier.findByIdAndUpdate({ _id: id }, { $set: 
            {
                cnic: req.body.cnic,
                name: req.body.name,
                contact: req.body.contact,
                brand:req.body.brand,
                vehicleNo:req.body.vehicleNo
        } 
    });

        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json("not updated");
    }
});

// Route to delete a Supplier
SupplierRouter.delete('/deleteSupplier', async (req, res) => {
    try {
        const id = req.query.id;
        let getSupplier = await Supplier.findById(id);

        if (!getSupplier) {
            return  res.json({message:'Supplier not found'});
        }

        await Supplier.findOneAndRemove({ _id: id });

        res.status(200).json("Deleted");
    } catch (error) {
        res.status(500).json("Supplier member not Delete");
    }
});

// selected product delete
SupplierRouter.post('/deleteSelectedUsers', async (req, res) => {
    const SupplierIds = req.body.SupplierIds; // Assuming the frontend sends an array of order IDs
    // Delete the selected orders from MongoDB
  
    // Convert the orderIds array to MongoDB ObjectIds
    const mongoObjectIds = SupplierIds.map(id => new ObjectId(id));
    try {
      const response = await Supplier.deleteMany({ _id: { $in: mongoObjectIds } });
      if (response.deletedCount > 0) {
        res.status(200).json({ success: true });
      } else {
        return res.status(404).json({ success: false, message: 'No matching orders found.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  
  });


module.exports = SupplierRouter;