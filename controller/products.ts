import {  Request, Response } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";
import DB from "../config/db/index.ts";

const MONGO_PRODUCTS = await DB.collection('products');

// let products: Product[] = [
//     {
//         id:"1",
//         name:"a",
//         desc:"aaaaaaa",
//         price:1
//     },
//     {
//         id:"1",
//         name:"b",
//         desc:"bbbbb",
//         price:3
//     },
//     {
//         id:"1",
//         name:"c",
//         desc:"cccccc",
//         price:10
//     }
// ]

const getProducts = async ({response}:{response:Response}) => {
    const products = await MONGO_PRODUCTS.find();
    response.body = {
        message:"success",
        data: products
    }
}


const getProduct = async ({params, response}:{params : {id: string }, response:Response}) => {
   const product: Product | undefined = await MONGO_PRODUCTS.find({_id: {"$oid": params.id}});

    if(product){
        response.status = 200
        response.body = {
            message: "success",
            data: product
        }
        return
    }
    response.status = 404
    response.body = {
        message: "failure",
        data: null
    }
}

const craeteProduct = async ({request, response}:{request: Request, response:Response}) => {
    const body = await request.body();
    if(!request.hasBody){
        response.status = 400
        response.body = {
            message: "failure",
            data: null
        }
        return
    }
    const product: Product  = body.value
    // product.id = v4.generate()
    const productId = await MONGO_PRODUCTS.insertOne(product);
    response.status = 200
    response.body = {
        message: "successs",
        data: { ...product, productId}
    }
}

const updateProduct = async ({params, request, response}:{params:{id:string}, request: Request, response:Response}) => {
    const product: Product | undefined = await MONGO_PRODUCTS.find({_id: {"$oid": params.id}});
    if(!product){
        response.status = 404
        response.body = {
            message: "failure",
            data: null
        }
        return
    }
    const body = await request.body();

    const updatedProduct: {name?: string, desc?: string, price?: number } = body.value

    const _ = {...product, ...updatedProduct}
    const {matchedCount, modifiedCount, upsertedId} = await MONGO_PRODUCTS.updateOne({_id: {"$oid":params.id}}, { $set: _})

    response.status = 200
    response.body = {
        message: "success",
        data: {
            matchedCount,
            modifiedCount,
            upsertedId
        }
    }

}

const deleteProduct = async ({params, response}:{params: {id: string }, response:Response}) => {
    const product: Product | undefined = await MONGO_PRODUCTS.find({_id: {"$oid": params.id}});
    console.log('====================================');
    console.log(product);
    console.log('====================================');
    if(!product){
        response.status = 404
        response.body = {
            message: "failure",
            data: null
        }
        return
    }
    const deleteCount = await MONGO_PRODUCTS.deleteOne({_id: {"$oid":params.id}})
    response.body = {
        message:"success",
        data: deleteCount
    }
}

export { getProducts, getProduct, craeteProduct, updateProduct, deleteProduct }