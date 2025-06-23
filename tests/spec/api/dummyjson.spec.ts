import test, { expect } from "@playwright/test"
import { MyLoginService } from "../../api/service/login.service";
import { setAuth } from "../../../auth/auth.store";
import { ProductService } from "../../api/service/product.service";

test.describe('login test case', () => {
    const loginService = new MyLoginService();
    const productService = new ProductService();

    test('login failed', async () => {
        const {data , status} = await loginService.login("asdnkajnd", "asjdnajksnd");
        expect(status).toBe(400);
    })

    test('login success', async () => {
        const {data , status} = await loginService.login("emilys", "emilyspass");
        expect(status).toBe(200);
        expect(data).toBeTruthy();
        setAuth(data.accessToken);
    })
    
    test('login with wrong username', async () => {
        const {data , status} = await loginService.login("askjdnajksnd", "emilyspass");
        expect(status).toBe(400);
        expect(data.message).toEqual("Invalid credentials");
    })
    
    test('login with wrong password', async () => {
        const {data , status} = await loginService.login("emilys", "asjdnajksnd");
        expect(status).toBe(400);
        expect(data.message).toEqual("Invalid credentials");    })
    
    test('login with wrong username and password', async () => {
        const {data , status} = await loginService.login("emilys", "asjdnajksnd");
        expect(status).toBe(400);
        expect(data.message).toEqual("Invalid credentials");   
    })

    test('login with empty username', async () => {
        const {data , status} = await loginService.login("", "emliyspass");
        expect(status).toBe(400);
        expect(data.message).toEqual("Username and password required");  
    })
    
    test('login with empty password', async () => {
        const {data , status} = await loginService.login("emilys", "");
        expect(status).toBe(400);
        expect(data.message).toEqual("Username and password required");  
    })
    
    test('login with empty username and password', async () => {
        const {data , status} = await loginService.login("", "");
        expect(status).toBe(400);
        expect(data.message).toEqual("Username and password required");  
    })

    test('get products', async () => {
        const {data , status} = await productService.getProducts();
        expect(status).toBe(200);
        expect(data).toBeTruthy();
        expect(data.products[0].title).toEqual("Essence Mascara Lash Princess");
    })
})

