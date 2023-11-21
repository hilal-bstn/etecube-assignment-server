const Product = require("../models/productModel");

const create = async (req, resp) => {
    try {
        let product = new Product(req.body.product);
        let result = await product.save();
        return resp.send(result);
    } catch (error) {
        console.error(error);
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const getAll = async (req, resp) => {
    try {
        let products = await Product.find().populate("companyId");

        if (products.length > 0) {
            return resp.send(products);
        } else {
            return resp.send({ result: "No products found." });
        }
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const newProducts = async (req, resp) => {
    try {
        let products = await Product.find().sort({ "_id": -1 }).limit(3);

        if (products.length > 0) {
            return resp.send(products);
        } else {
            return resp.send([]);
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const deleteProduct = async (req, resp) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });

        if (result.deletedCount > 0) {
            return resp.send({ message: "Product deleted successfully." });
        } else {
            return resp.status(404).send({ error: "No product found with the given ID." });
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const updateProduct = async (req, resp) => {
    try {
        let result = await Product.updateOne(
            { _id: req.params.id },
            { $set: req.body.product }
        );

        if (result) {
            return resp.send(result);
        } else {
            return resp.send({ result: "No record found." });
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const productSearch = async (req, resp) => {
    try {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { category: { $regex: req.params.key, $options: 'i' } },
            ]
        }).populate("companyId");

        return resp.send(result);
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const update = async (req,res) =>{
    let result = await Product.updateOne(
        {
             _id : req.params.id 
        },
        {
            $set : req.body.product
        }
    )
    if(result)
    {
      return resp.send(result);
    }
    else{
       return resp.send({result:"No record found."});
    }
}


module.exports = {
    create,
    getAll,
    updateProduct,
    deleteProduct,
    productSearch,
    newProducts,
    getAll,
    update
}

