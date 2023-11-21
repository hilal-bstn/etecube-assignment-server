const Company = require("../models/companyModel");

const createCompany = async (req, resp) => {
    try {
        let company = new Company(req.body.company);
        let result = await company.save();
        return resp.send(result);
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};


const update = async (req, resp) => {
    try {
        let result = await Company.updateOne(
            { _id: req.params.id },
            { $set: req.body.company }
        );

        if (result.nModified > 0) {
            return resp.send({ message: "Company updated successfully." });
        } else {
            return resp.send({ result: "No record found." });
        }
    } catch (error) {
       return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const deleteCompany = async (req, resp) => {
    try {
        const result = await Company.deleteOne({ _id: req.params.id });

        if (result.deletedCount > 0) {
            return resp.send({ message: "Company deleted successfully." });
        } else {
            return resp.status(404).send({ error: "No company found with the given ID." });
        }
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const newCompanies = async (req, resp) => {
    try {
        let companies = await Company.find().sort({ "_id": -1 }).limit(3);

        if (companies.length > 0) {
            return resp.send(companies);
        } else {
            return resp.send([]);
        }
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

const getCompanies = async (req, resp) => {
    try {
        let companies = await Company.find();

        if (companies.length > 0) {
            return resp.send(companies);
        } else {
            return resp.send({});
        }
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};
const companySearch = async (req, resp) => {
    try {
        let result = await Company.find({
            "$or": [
                { companyName: { $regex: req.params.key, $options: 'i' } },
                { companyLegalNumber: { $regex: req.params.key, $options: 'i' } },
                { incorporationCountry: { $regex: req.params.key, $options: 'i' } }
            ]
        });

        return resp.send(result);
    } catch (error) {
        return resp.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = {
    createCompany,
    update,
    deleteCompany,
    newCompanies,
    getCompanies,
    companySearch
}
