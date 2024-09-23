import mongoose, { model, models, Schema } from "mongoose";

// mongoose: is the main mongoDB object modeling tool for Nod.js.
// It allows you to define schemas and models to interact with mongoDB collections and documents.
// model: is a method of the mongoose which is used to create a new model(which represents a mongoDB collection)
// models: store all the registered models in the current connection.It is used to check a model has already created.
// schema: Mongoose class used to define the structure of documents(row) within a collection, include their type, validation and relationships.

// Define the Category Schema
const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
  // properties: [{ type: Object }]
});

export const Category = models?.Category || model('Category', CategorySchema);