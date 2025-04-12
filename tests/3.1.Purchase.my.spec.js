import { test, expect } from "@playwright/test";
import { URLs } from "../Common/URLs";

test("End-to-End Purchase Flow for a Single Product", async ({ page }) => {
  // Step 1: Navigate to the website
  //await page.goto("https://www.testing101.net/category/all-products");
  await page.goto(URLs.pageLinkCategoryAllProducts);
  // await page.waitForTimeout(5000);
  test.setTimeout(50000);
  //Click on the Consent button on Cookie pop-up
  await page.getByRole("button", { name: "Consent" }).click();

  // Click on the Sorting option of the Fiter tab
  await page.getByRole("link", { name: "Sorting" }).click();
  await page.waitForTimeout(5000);
  //Click on the Add to Card button on the Americano product
  await page
    //.getByRole("group", { name: "Americano gallery" })
    .getByLabel("Americano gallery")
    .getByLabel("Add to Cart")
    .click();
  //Click on the view Card button on the Card sidebar
  await page.getByRole("button", { name: "View Cart" }).click();
  //Cart Assertion
  await expect(page.getByText("Cart is empty")).not.toBeVisible();

  // await expect(page.getByText("Cart is empty")).toBeVisible();

  //Click on the Checkout button on the My Card page
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.waitForTimeout(5000);
  //Checkout step 1
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("mihhail.karuzin@gmail.com");

  await page.getByRole("textbox", { name: "First name" }).fill("Mihhail");
  await page.getByRole("textbox", { name: "Last name" }).fill("Karuzin");
  await page.getByRole("textbox", { name: "Phone" }).fill("+37255912318");
  await page.getByRole("combobox", { name: "Country/Region" }).click();
  await page.getByText("Estonia").click();
  await page.getByRole("combobox", { name: "Address" }).fill(" Apartment test");
  await page.getByRole("textbox", { name: "City" }).fill("Tallinn");
  await page.getByRole("textbox", { name: "Zip / Postal code" }).fill("12345");
  await page.getByRole("button", { name: "Continue" }).click();
  //Checkout step 2
  await page.getByRole("button", { name: "Continue" }).click();
  //Checkout step 3
  await page.getByRole("button", { name: "Place Order & Pay" }).click();
  await page.waitForTimeout(10000);
  //Assertion
  await expect(page.getByText("You'll receive a confirmation")).toBeVisible({
    timeout: 5000,
    errorMessage:
      "Error: The purchase confirmation message was not displayed on the webpage.",
  });

  await page.pause();
});
