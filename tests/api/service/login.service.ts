import { defaultContext } from "../context/api.contex";

export class MyLoginService {
    async login(username: string, pwd: string) {
        try {
            const context = await defaultContext();
            const response = await context.post('auth/login',
            {
                data: {
                    username: username,
                    password: pwd
                }
            });

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