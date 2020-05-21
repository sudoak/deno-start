import {  Request, Response } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Product from "../types.ts";

const products: Product[] = [
    {
        id:1,
        name:"a",
        desc:"aaaaaaa",
        price:1
    },
    {
        id:1,
        name:"b",
        desc:"bbbbb",
        price:3
    },
    {
        id:1,
        name:"c",
        desc:"cccccc",
        price:10
    }
]

const getProducts = ({response}:{response:Response}) => {
    response.body = {
        message:"success",
        data: products
    }
}


const getProduct = ({params, response}:{params : {id: string }, response:Response}) => {
    const product: Product | undefined = products.find( p => p.id === params.id)

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
    product.id = v4.generate()
    products.push(product)
    response.status = 200
    response.body = {
        message: "successs",
        data: product
    }
}

const updateProduct = ({response}:{response:Response}) => {
    response.body = {
        message:"success",
        data: products
    }
}

const deleteProduct = ({response}:{response:Response}) => {
    response.body = {
        message:"success",
        data: products
    }
}

export { getProducts, getProduct, craeteProduct, updateProduct, deleteProduct }