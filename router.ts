import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get('/api/v1/products', ({response} : { response: any}) => {
    response.body = `Hello Ak`;
})

export default router;