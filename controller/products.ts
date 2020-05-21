import {  Response } from "https://deno.land/x/oak/mod.ts";

import Product from "../types.ts";

const produts: Product[] = [
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
        data: produts
    }
}


const getProduct = ({params, response}:{params : {id: string }, response:Response}) => {
    const product: Product | undefined = produts.find( p => p.id === params.id)

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

const craeteProduct = ({response}:{response:Response}) => {
    response.body = {
        message:"success",
        data: produts
    }
}

const updateProduct = ({response}:{response:Response}) => {
    response.body = {
        message:"success",
        data: produts
    }
}

const deleteProduct = ({response}:{response:Response}) => {
    response.body = {
        message:"success",
        data: produts
    }
}

export { getProducts, getProduct, craeteProduct, updateProduct, deleteProduct }