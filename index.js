const { create } = require('domain')
const { json } = require('express')
const express = require('express')
const app= express()
const PORT= 3000
//Set up mongoose
const mongoose = require('mongoose')
const connectionString='mongodb://localhost:27017/bookapp'
app.use (express.json())
mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false

    },(err)=>{
        if (err){
            console.log(err)
        } else{
            console.log('Database connection successful')
        }
    
})
//Create schema
const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    description:String,
    category:String,
    purchaseCount:Number,
    imageUrl:String,
    tags:Array
})
const Book = mongoose.model('Book', bookSchema)

//POST request /books to create a new book
app.post("/books", function(req, res){

})
// Get request to /books to fetch all books 
app.get("./books",(req, res)=>{
    //Fetch all books
    Book.find({},(err,books)=>{
        if (err){
            return res.status(500).json({message:err})
        } else{
            return res.status(200).json({books})
        }
    })    
// Retrieve new book details fron request body
//const book = req.body.book (commenting this and readjusting the code below)
//console.log({book})
Book.create({
    title:req.body.title,
    author:req.body.author,
    description:req.body.description,
    category:req.body.category,
    purchaseCount:req.body.purchaseCount,
    imageUrl:req.body.imageUrl,
    tags:req.body.tags
},(err, newBook)=>{
if (err){ 
    return res.status(500).json({message:err})

} else{
    return res.status(500).json ({message:"New book created",newBook})
}
})
// Send response to client
})
// Get request to /books/: to fetch single book 
app.get("/books/:id",(req, res)=>{
//     Book.findOne({_id:req.params.id},(err, book)=>{
//         if (err){
//             return res.status(500).json({message:err})
//             }
//             else if (!book){
//                 res.status(404).json({message:"book not found"})
//         }
//          else{
//             return res.status(200).json({book})
//         }
//     })
// })

Book.findById(req.params.id,(err, book)=>{
    if (err){
        return res.status(500).json({message:err})
        }
        else if (!book){
            res.status(404).json({message:"book not found"})
    }
     else{
        return res.status(200).json({book})
    }
})
})
// PUT request to /books/: to update single book 
app.put("/book/:id",(req, res)=>{
    Book.findByIdAndUpdate(req.params.id,{
       title: req.body.title,
       category:req.body.category 
    },(err,book)=>{
        if (err){
            return res.status(500).json({message:err})
        } else if (!book){
            return res.status(404).json({message:"book not found"})
        } else{
            book.save((err, saveBook)=>{
                if (err){
                    return res.status(400).json({message:err})
                } else{
                    res.status(200).json({message:"Book updated successfully"})
                }
            });

        } 
    })

})

// DELETE REQUEST to /books/: to delete
app.delete("/books",(req,res)=>{
    findByIdAndDelete(req.params.id),(err,book)=>{
        if (err){
            return res.status(500).json({message:err})
        }
        else if (!book){
            return res.status(404).json({message:"book was not found"})
        }
        else{
            return res.status(200).json({message:"book deleted successfully"})
        }
    }
})
app.listen(PORT,()=>console.log(`App is listening on port ${PORT}`))
//model.find=>fetch multiple document
//model.findOne=> find single document
//model.findById=> find a single document by id
 


// model.finOneAndUpdate
// model.findByIdAndUpdate

//model.findOneAndDelete
//model.findByIdAndDelete
//model.findOneAndRemove
//model.findByIdAndRemove 