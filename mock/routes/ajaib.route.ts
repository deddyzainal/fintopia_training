import { Page, Route, APIRequestContext } from "@playwright/test";

export async function interceptChangeAjaibLoginRoute(page: Page, request: APIRequestContext, mockData: object): Promise<void> {
    await page.route('**/api/v7/login/', async (route: Route) => {
      const originalRequest = route.request();
  
      const modifiedRequest = await request.fetch(originalRequest.url(), {
        method: originalRequest.method(),
        headers: {
          ...originalRequest.headers(),
          'content-type': 'application/json',
        },
        data: mockData,
      });
  
      await route.fulfill({
        status: modifiedRequest.status(),
        headers: modifiedRequest.headers(),
        body: await modifiedRequest.body(),
      });
    });
  }
  
  export async function interceptAjaibLoginRoute(page: Page, request: APIRequestContext): Promise<void> {
    await page.route('**/api/v7/login/', async (route: Route) => {
      const originalRequest = route.request();
      const requestBody = originalRequest.postData();
  
      const getData = await request.fetch(originalRequest.url(), {
        method: originalRequest.method(),
        headers: {
          ...originalRequest.headers(),
        },
        data: requestBody,
      });

      console.log('get status: ', getData.status());
      console.log('get headers:', getData.headers());
      console.log('get body: ', requestBody);

      await route.continue();
    })
}