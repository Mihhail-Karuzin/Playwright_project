import { test, expect } from "@playwright/test";
import { URLs } from "../Common/URLs";

test("Add a new adress in My Account  ", async ({ page }) => {
  // Step 1: Navigate to the website
  // await page.goto("https://www.testing101.net/");
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);
  //Click on the Consent button on Cookie pop-up
  await page.getByRole("button", { name: "Consent" }).click();
  //Click on the Login button on the header
  await page.getByRole("button", { name: "Log In" }).click();
  //Click on the Login button on the Signup page
  await page.getByTestId("signUp.switchToSignUp").click();
  //Input valid data into the Email field
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("mihhailkaruzin@gmail.com");
  //Input valid data into the Password field
  await page.getByRole("textbox", { name: "Password" }).fill("123456789");
  //Click on the Login button of the Login form
  await page.getByTestId("buttonElement").click();
  // Assertion: Check if 'mihhailkaruzin account menu' is visible after login
  await expect(page.getByLabel("mihhailkaruzin account menu")).toBeVisible();
  //Click on Account menu on the Header
  await page.getByLabel("mihhailkaruzin account menu").click();
  //Click on My Adresses In the Navigation menu
  await page.getByRole("menuitem", { name: "My Addresses" }).click();
  // Click on New Adress button
  await page
    .frameLocator('iframe[title="My Addresses"]')
    .getByRole("button", { name: "Add New Address" })
    .click();
  // Start interaction with the iframe
  const frame = page.frameLocator("xpath=/html/body/div[1]/div/div[5]/iframe");
  // Fill in First Name field
  await frame.getByLabel("First name").fill("Mihhail");
  //Fill in Last Name field
  await frame.getByLabel("Last name").fill("Karuzin");
  //Fill in Company Name field
  await frame.getByLabel("Company name").fill("QA");
  //Fill in Address field
  await frame.getByLabel("Address", { exact: true }).fill("Estonia,Tallinn");
  //Fill in Address line 2 field
  await frame
    .getByPlaceholder("Apartment, suite, floor")
    .fill("Apartment test");
  //Fill in Address City
  await frame.getByLabel("City").fill("Tallinn");
  //Open the Country Drop-down menu
  await frame.getByRole("img").nth(1).click();
  await frame.getByText("Estonia").click();
  await page.waitForTimeout(3000);
  //Fill in Zip code/Postal code field
  await frame.getByLabel("Zip / Postal code").fill("12345");
  //Fill in Phone field
  await frame.getByLabel("Phone").fill("+37255912318");
  //Click on Add Address button
  await frame.getByLabel("Add Address and close dialog").click();
  // Assertion

  const addressLocator = page
    .frameLocator('iframe[title="My Addresses"]')
    .locator('address.m-wda[data-hook="formatted-address"]');

  await expect(addressLocator).toHaveText(`
  Mihhail Karuzin
  QA
  Estonia,Tallinn, Apartment test
  Tallinn,  12345
  Estonia
  +37255912318
`);
  await page.pause();
});
