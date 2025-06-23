import { authContext, defaultContext } from "../context/api.contex";

export class ProductService {
    async getProducts() {
        try {
            const context = await authContext();
            const response = await context.get('auth/products');

            const data = await response.json();
            const status = response.status();

            return {
                data: data,
                status: status
            };
        } catch (e) {
            throw e;
        }
    }
}