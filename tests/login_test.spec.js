import { test, expect } from '@playwright/test';

test('login test-fail', async ({ browser }) => {
  const context = await browser.newContext({
    headless: false, // Enable headed mode
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5000/signin');
  
  // Fill in the login form
  await page.getByLabel('Email/Phone No').click();
  await page.getByLabel('Email/Phone No').fill('hello@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('hell@123.');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check if the error message is displayed
  const errorMessage = page.getByText('User not found. Please check');
  await expect(errorMessage).toBeVisible();

  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  // Check if the user is redirected to the sign-up page
  await expect(page).toHaveURL('http://localhost:5000/signup');
});

test('login test-success', async ({ page }) => {
  await page.goto('http://localhost:5000/signin');
  await page.getByLabel('Email/Phone No').click();
  await page.getByLabel('Email/Phone No').fill('n200392@rguktn.ac.in');
  await page.getByLabel('Email/Phone No').press('Tab');
  await page.getByLabel('Password').fill('1234');
  await page.pause();
  
//   await page.pause();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.pause();
});