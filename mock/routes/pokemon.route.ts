import { Page, Route } from "playwright";
import { MockBulbasaurResponse } from "../response/pokemon.mock";

export async function MockPokemonRoute(page: Page, MockPokemonResponse: object): Promise<void> {
    await page.route('**/api/v2/ability/battle-armor', (route: Route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(MockPokemonResponse),
        })
    })
}

export async function MockStatusErrorPokemonRoute(page: Page, statusCode: number): Promise<void> {
    await page.route('**/api/v2/ability/battle-armor', (route: Route) => {
        route.fulfill({
            status: statusCode
        })
    })
}

export async function MockPartialPokemonRoute(page: Page): Promise<void> {
    await page.route('**/api/v2/ability/battle-armor', async (route: Route) => {
        const response = await route.fetch();
        const jsonParsed = await response.json();

        jsonParsed.name = MockBulbasaurResponse.name;
        jsonParsed.generation.name = MockBulbasaurResponse.generation.name;
        jsonParsed.generation.url = MockBulbasaurResponse.generation.url;

        route.fulfill({
            json: jsonParsed
        })
    })
}

export async function MockAbortPokemonRoute(page: Page): Promise<void> {
    await page.route('**/api/v2/ability/battle-armor', (route: Route) => {
        route.abort();
    })
}

export async function MockUrlPokemonRoute(page: Page): Promise<void> {
    await page.route('**/api/v2/ability/battle-armor', async (route: Route) => {
        // route.continue({
        //     url: 'https://pokeapi.co/api/v2/pokemon-species/aegislash'
        // })

        const redirect = await route.fetch({
            url: route.request().url().replace('/api/v2/ability/battle-armor', '/api/v2/pokemon-species/aegislash'),
            });
        
        await route.fulfill({
            response: redirect
        });
    })
}