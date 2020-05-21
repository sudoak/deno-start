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

export { getProducts }