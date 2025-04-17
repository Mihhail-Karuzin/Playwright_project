import { test, expect } from "@playwright/test";
import { URLs } from "../Common/URLs";
import { consentPopup } from "../Common/ConsentPopup";
import { pagePLP } from "../PageObjects/PagePLP";
import { pageCartPage } from "../PageObjects/PageCartPage";
import { pageCheckout } from "../PageObjects/PageCheckout";
import { testData } from "../Common/TestData";

test("End-to-End purchase flow with the XPath locators", async ({ page }) => {
  test.setTimeout(50000);
  // Step 1: Navigate to the Testing101 website
  //await page.goto("https://www.testing101.net/category/all-products");
  await page.goto(URLs.pageLinkCategoryAllProducts);
  await page.waitForTimeout(5000);

  const consentPopupWindow = new consentPopup(page);
  // await consentPopupWindow.clickButtonConsent();
  await consentPopupWindow.clickManageOptions();
  //Click on the Consent button on Cookie pop-up
  //await page.getByRole("button", { name: "Consent" }).click();
  // const buttonConsent = page.locator("xpath=//button[@aria-label='Consent']");
  // await buttonConsent.click();

  const plpPage = new pagePLP(page);
  //Click on the Sorting option of the Filter tab
  //const buttonSorting = page.locator("xpath=//span[text()='Sorting']");
  const buttonSorting = page.locator(plpPage.buttonSorting);
  await buttonSorting.click();
  await page.waitForTimeout(5000);

  //Click on the Add To Cart button on the Americano product
  /*const buttonAddToCartPLP = page.locator(
    "xpath=//div[@data-slug='americano']//span[text()='Add to Cart']"
  );
  */
  const buttonAddToCartPLP = page.locator(plpPage.buttonAddToCartPLP);

  await buttonAddToCartPLP.waitFor();
  await buttonAddToCartPLP.click();

  const cartPage = new pageCartPage(page);
  //Start interacting with the iframe
  //const buttonViewCart = page.locator('xpath=//span[text()="View Cart"]');
  const buttonViewCart = page.locator(cartPage.buttonViewCart);
  await buttonViewCart.waitFor();
  await buttonViewCart.click();

  //Cart Assertion
  //const assertionEmptyCart = page.locator('xpath=//h3[text()="Cart is empty"]');
  /*
  const assertionEmptyCart = page.locator(
    'xpath=//h3[@data-hook="EmptyState.title"]'
  );
  */
  const assertionEmptyCart = page.locator(cartPage.assertionEmptyCart);

  await expect(assertionEmptyCart).not.toBeVisible();

  //Click on the Checkout button on the My Card page
  //const buttonCheckout = page.locator("xpath=//span[text()='Checkout']");
  const buttonCheckout = page.locator(cartPage.buttonCheckout);
  await buttonCheckout.waitFor();
  await buttonCheckout.click();

  //Checkout step 1
  const checkoutPage = new pageCheckout(page);
  //const fieldEmail = page.locator("xpath=//input[@aria-label='Email']");
  const fieldEmail = page.locator(checkoutPage.fieldEmail);
  //await fieldEmail.fill("mihhail.karuzin@gmail.com");
  await fieldEmail.fill(testData.checkouCustomerDetails.email);

  // const fielFirstName = page.locator("xpath=//input[@aria-label='First name']");
  const fielFirstName = page.locator(checkoutPage.fielFirstName);
  await fielFirstName.fill(testData.checkouCustomerDetails.firstName);

  //const fieldLastName = page.locator("xpath=//input[@aria-label='Last name']");
  const fieldLastName = page.locator(checkoutPage.fieldLastName);
  await fieldLastName.fill(testData.checkouCustomerDetails.lastName);

  //const fieldPhone = page.locator("xpath=//input[@aria-label='Phone']");
  const fieldPhone = page.locator(checkoutPage.fieldPhone);
  await fieldPhone.fill(testData.checkouCustomerDetails.phone);

  //Locate the country dropdown input
  /*
  const dropdownCountryRegion = page.locator(
    "xpath=//div[@data-hook='form-field-country']"
  );
  */
  const dropdownCountryRegion = page.locator(
    checkoutPage.dropdownCountryRegion
  );
  await dropdownCountryRegion.waitFor();
  await dropdownCountryRegion.click();

  //const dropdownOption = page.locator("xpath=//div[text()='Estonia']");
  const dropdownOption = page.locator(checkoutPage.dropdownOption);
  await dropdownOption.click();

  /*
  const fieldAdress = page.locator(
    "xpath=//div[@data-hook='form-field-address_line']//input[@role='combobox']"
  );
  */
  const fieldAdress = page.locator(checkoutPage.fieldAdress);
  await fieldAdress.fill(testData.checkoutDeliveryDetails.adress);

  //const fieldCity = page.locator("xpath=//input[@aria-label='City']");
  const fieldCity = page.locator(checkoutPage.fieldCity);
  await fieldCity.fill(testData.checkoutDeliveryDetails.city);

  /*
  const fieldZipCode = page.locator(
    "xpath=//input[@aria-label='Zip / Postal code']"
  );
  */
  const fieldZipCode = page.locator(checkoutPage.fieldZipCode);
  await fieldZipCode.fill(testData.checkoutDeliveryDetails.zipCode);

  /*
  const buttonContinueCheckout1 = page.locator(
    "xpath=//span[text()='Continue']"
  );
  */
  const buttonContinueCheckout1 = page.locator(
    checkoutPage.buttonContinueCheckout1
  );
  await buttonContinueCheckout1.click();

  // Checkout step 2
  /*
  const buttonContinueCheckout2 = page.locator(
    "xpath=//span[text()='Continue']"
  );
  */
  const buttonContinueCheckout2 = page.locator(
    checkoutPage.buttonContinueCheckout2
  );
  await buttonContinueCheckout2.click();

  //Checkout step 3
  /*
  const buttonPlaceOrder = page.locator(
    "xpath=//span[text()='Place Order & Pay']"
  );
  */
  const buttonPlaceOrder = page.locator(checkoutPage.buttonPlaceOrder);
  await buttonPlaceOrder.waitFor();
  await buttonPlaceOrder.click();
  await page.waitForTimeout(5000);

  //Assertion
  await expect(
    page.locator(
      'xpath=//span[text()="You\'ll receive a confirmation email soon."]'
    )
  ).toBeVisible({
    timeout: 5000,
    errorMessage:
      "Error: The purchase confirmation message was not displayed on the webpage.",
  });
});
