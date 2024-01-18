let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
