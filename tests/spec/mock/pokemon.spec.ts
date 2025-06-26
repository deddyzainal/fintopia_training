import { test } from '@playwright/test';
import { MockPokemonResponse, MockBulbasaurResponse } from '../../../mock/response/pokemon.mock';
import { MockAbortPokemonRoute, MockStatusErrorPokemonRoute, 
  MockPartialPokemonRoute, MockPokemonRoute, 
  MockUrlPokemonRoute} from '../../../mock/routes/pokemon.route';
import { DashboardPokemonController } from '../../api/controller/pokemon/pokemon.controller';

// test.describe.configure({ mode: 'serial' });

test.describe('Response Mock Testing', () => {
  let dashboardPokemonController: DashboardPokemonController;

  test.beforeEach(async ({ page }) => {
    dashboardPokemonController = new DashboardPokemonController(page);
    await page.goto('https://pokeapi.co/');
  });

  test('No Mock', async () => {
    await dashboardPokemonController.clickMenu('ability/battle-armor');
    await dashboardPokemonController.verifyText("battle-armor");
    await dashboardPokemonController.verifyText("generation-iii");
    await dashboardPokemonController.verifyText("https://pokeapi.co/api/v2/generation/3/");
  });

  test('Mock Whole Response', async ({ page }) => {
    await MockPokemonRoute(page, MockPokemonResponse);
  
    await dashboardPokemonController.clickMenu('ability/battle-armor');
    await dashboardPokemonController.verifyText(MockPokemonResponse.name);
    await dashboardPokemonController.verifyText(MockPokemonResponse.generation.name);
    await dashboardPokemonController.verifyText(MockPokemonResponse.generation.url);
  });

  test('Mock Error 400 Bad Request', async ({ page }) => {
    await MockStatusErrorPokemonRoute(page, 400);
  
    await dashboardPokemonController.clickMenu('ability/battle-armor');
    await dashboardPokemonController.verifyHeaderText('400 Bad Request')
  });

  test('Mock Error 500 Internal Server Error', async ({ page }) => {
    await MockStatusErrorPokemonRoute(page, 500);
  
    await dashboardPokemonController.clickMenu('ability/battle-armor');
    await dashboardPokemonController.verifyHeaderText('500 Internal Server Error')
  });

  test('Mock Partial Data', async ({ page }) => {
    await MockPartialPokemonRoute(page);
  
    await dashboardPokemonController.clickMenu('ability/battle-armor');
    await dashboardPokemonController.verifyText(MockBulbasaurResponse.name);
    await dashboardPokemonController.verifyText(MockBulbasaurResponse.generation.name);
    await dashboardPokemonController.verifyText(MockBulbasaurResponse.generation.url);
    await dashboardPokemonController.verifyText('Protects against critical hits');
  });

  test('Mock Abort Request', async ({ page }) => {
    await MockAbortPokemonRoute(page);

    await dashboardPokemonController.clickMenu('ability/battle-armor');
    await dashboardPokemonController.verifyHeaderText('TypeError: Failed to fetch')
  });

  test('Mock Redirect to another Request', async ({ page }) => {
    await MockUrlPokemonRoute(page);

    await dashboardPokemonController.clickMenu('ability/battle-armor');
    await dashboardPokemonController.verifyText("aegislash");
    await dashboardPokemonController.verifyText("generation-vi");
    await dashboardPokemonController.verifyText("https://pokeapi.co/api/v2/generation/6/");
  });
})