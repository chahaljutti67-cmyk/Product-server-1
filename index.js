import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1","8.8.8.8"]);
app.use(cors({
origin: "http://localhost:5173",
methods:["GET","POST","DELETE","PUT"],
}),
);
app.use(express.json())
async function ConnectionDB(){
try{
await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connectes");
}
catch(error){
console.error("MongoDB connection error:",error);
}
}
ConnectionDB();
let products=[
{
id:1,
name :"vivo mobile",
price: 20000,
imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_KvzkgyuU8imhPAIYT-QLgCjdtEE4lZT-WuBwAELgyA&s=10",desc: "vivo mobile is a smartphone brand known for its innovative features and sleek designs.",
},
{
id:2,
name :"samsung mobile",
price : 30000,
imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP-EFnZpjNVSEkJTzFVhWWZHJB1SCGVLSPNuVIoefrnQ&s=10",
desc : "samsung mobile is a leading smartphone brand known for its high-quality devices and innovative technology.",
},
{
    id:3,
    name : "iphone mobile",
    price: 50000,
    imageUrl:"https://cdn.britannica.com/09/241709-050-149181B1/apple-iphone-11-2019.jpg",
     desc : "iphone mobile is a premium smartphone brand known for its  sleek design, advaced features, and seamless integration with the Apple ecosystem.",
}
]
app.get("/products",(req,res)=>{
res.json(products);
});
app.post("/products",(req,res)=>{
const newProduct = req.body;
products.push(newProduct);
res.status(201).json(newProduct);
});
app.delete("/products/:id",(req,res)=>{
const {id} = req.params;
products = products.filter(product => product.id !== parseInt(id));
res.status(204).send();
})
app.put("/products/:id",(req ,res)=>{
const{id} = req.params;
const updatedProduct = req.body;

const index =products.findIndex(product => product.id === parseInt(id));  
if(index !== -1){  
    products[index] = {...products[index],...updatedProduct};  
    res.json(products[index]);  
}  
else{  
    res.status(404).json({message:"product not found"});  
}

});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});