import { test, expect } from "@playwright/test";
import { URLs } from "../Common/URLs";
import { consentPopup } from "../Common/ConsentPopup";
import { pageLogin } from "../PageObjects/PageLogin";
import { pageSignUp } from "../PageObjects/PageSignUp";
import { testData } from "../Common/TestData";
import { pageMyAccount } from "../PageObjects/PageMyAccount";

test.only("Add a new address in My Account", async ({ page }) => {
  test.setTimeout(50000);
  //Navigate to the Testing101 website
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);
  const consentPopupWindow = new consentPopup(page);
  await consentPopupWindow.clickButtonConsent();
  const loginPage = new pageLogin(page);
  const buttonLoginHeader = page.locator(loginPage.buttonLoginHeader);
  await buttonLoginHeader.click();
  const signUpPage = new pageSignUp(page);
  const buttonLoginSignUp = page.locator(signUpPage.buttonLoginSignUp);
  await buttonLoginSignUp.click();
  const fieldEmail = page.locator(loginPage.fieldEmail);
  await fieldEmail.fill(testData.userLogin.emailValid);
  const fieldPassword = page.locator(loginPage.fieldPassword);
  await fieldPassword.fill(testData.userLogin.passwordValid);
  const buttonLoginPage = page.locator(loginPage.buttonLoginPage);
  await buttonLoginPage.click();
  await expect(page.getByLabel("mihhailkaruzin account menu")).toBeVisible();

  const myAccountPage = new pageMyAccount(page);
  const buttonMyAccount = page.locator(myAccountPage.buttonMyAccount);
  await buttonMyAccount.click();
  const buttonMyAddress = page.locator(myAccountPage.buttonMyAddress);
  await buttonMyAddress.click();

  const buttonAddNewAddress = page
    .frameLocator(myAccountPage.iframeMyAddress)
    .locator(myAccountPage.buttonAddNewAddress);
  await page.waitForTimeout(5000);
  await buttonAddNewAddress.click();
  await page.reload();
  await buttonAddNewAddress.click();

  const iframeNewAddress = page.frameLocator(myAccountPage.iframeNewAddress);
  const fieldFirstName = iframeNewAddress.locator(myAccountPage.fieldFirstName);
  await fieldFirstName.fill(testData.CustomerDetails.firstName);

  const fieldLastName = iframeNewAddress.locator(myAccountPage.fieldLastName);
  await fieldLastName.fill(testData.CustomerDetails.lastName);
  const fieldCompanyName = iframeNewAddress.locator(
    myAccountPage.fieldCompanyName
  );
  await fieldCompanyName.fill(testData.CustomerDetails.companyName);
  const fieldAddress = iframeNewAddress.locator(myAccountPage.fieldAddress);
  await fieldAddress.fill(testData.DeliveryDetails.address);
  const fieldAddressLine2 = iframeNewAddress.locator(
    myAccountPage.fieldAddressLine2
  );
  await fieldAddressLine2.fill(testData.DeliveryDetails.address);
  const fieldCity = iframeNewAddress.locator(myAccountPage.fieldCity);
  await fieldCity.fill(testData.DeliveryDetails.city);
  const dropDownCountry = iframeNewAddress.locator(
    myAccountPage.dropdownCountry
  );
  await dropDownCountry.click();
  const dropDownOption = iframeNewAddress.locator(myAccountPage.dropdownOption);
  await dropDownOption.click();

  const fieldZipCode = iframeNewAddress.locator(myAccountPage.fieldZipCode);
  await fieldZipCode.fill(testData.DeliveryDetails.zipCode);
  const fieldPhone = iframeNewAddress.locator(myAccountPage.fieldPhone);
  await fieldPhone.fill(testData.CustomerDetails.phone);
  const buttonAddAddress = iframeNewAddress.locator(
    myAccountPage.buttonAddAddress
  );
  await buttonAddAddress.click();
  await page.waitForTimeout(5000);

  // Assertion
  const addressLocator = page
    .frameLocator('iframe[title="My Addresses"]')
    .locator('address.m-wda[data-hook="formatted-address"]');

  await expect(addressLocator).toContainText([
    "Mihhail Karuzin",
    "TestCompany",
    "123 Street, 123 Street",
    "Tallinn, 12345",
    "Estonia",
    "512-34567",
  ]);
});
