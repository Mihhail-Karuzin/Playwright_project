import { test, expect } from "@playwright/test";
import { URLs } from "../Common/URLs";
import { consentPopup } from "../Common/ConsentPopup";
import { pageLogin } from "../PageObjects/PageLogin";
import { pageSignUp } from "../PageObjects/PageSignUp";
import { testData } from "../Common/TestData";

test("Login with valid credentials", async ({ page }) => {
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
});

test("Login with empty fields of the Login form", async ({ page }) => {
  test.setTimeout(50000);
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);

  const consentPopupWindow = new consentPopup(page);
  await consentPopupWindow.clickButtonConsent();

  const loginPage = new pageLogin(page);
  await page.locator(loginPage.buttonLoginHeader).click();

  const signUpPage = new pageSignUp(page);
  await page.locator(signUpPage.buttonLoginSignUp).click();

  await page.locator(loginPage.buttonLoginPage).click();

  await expect(page.getByText("Email cannot be blank")).toBeVisible();
  await expect(page.getByText("Make sure you enter a password.")).toBeVisible();
});

test("Login with an empty Email field of the Login form", async ({ page }) => {
  test.setTimeout(50000);
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);

  const consentPopupWindow = new consentPopup(page);
  await consentPopupWindow.clickButtonConsent();

  const loginPage = new pageLogin(page);
  await page.locator(loginPage.buttonLoginHeader).click();

  const signUpPage = new pageSignUp(page);
  await page.locator(signUpPage.buttonLoginSignUp).click();

  await page
    .locator(loginPage.fieldPassword)
    .fill(testData.userLogin.passwordValid);
  await page.locator(loginPage.buttonLoginPage).click();

  await expect(page.getByText("Email cannot be blank")).toBeVisible();
});

test("Login with an empty Password field of the Login form", async ({
  page,
}) => {
  test.setTimeout(50000);
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);

  const consentPopupWindow = new consentPopup(page);
  await consentPopupWindow.clickButtonConsent();

  const loginPage = new pageLogin(page);
  await page.locator(loginPage.buttonLoginHeader).click();

  const signUpPage = new pageSignUp(page);
  await page.locator(signUpPage.buttonLoginSignUp).click();

  await page.locator(loginPage.fieldEmail).fill(testData.userLogin.emailValid);
  await page.locator(loginPage.buttonLoginPage).click();

  await expect(page.getByText("Make sure you enter a password.")).toBeVisible();
});

test("Login with the invalid format of the Email", async ({ page }) => {
  test.setTimeout(50000);
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);

  const consentPopupWindow = new consentPopup(page);
  await consentPopupWindow.clickButtonConsent();

  const loginPage = new pageLogin(page);
  await page.locator(loginPage.buttonLoginHeader).click();

  const signUpPage = new pageSignUp(page);
  await page.locator(signUpPage.buttonLoginSignUp).click();

  await page
    .locator(loginPage.fieldEmail)
    .fill(testData.userLogin.emailInvalidFormat);
  await page
    .locator(loginPage.fieldPassword)
    .fill(testData.userLogin.passwordValid);
  await page.locator(loginPage.buttonLoginPage).click();

  await expect(
    page.getByText("Double check your email and try again.")
  ).toBeVisible();
});

test("Login with the invalid Password", async ({ page }) => {
  test.setTimeout(50000);
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);

  const consentPopupWindow = new consentPopup(page);
  await consentPopupWindow.clickButtonConsent();

  const loginPage = new pageLogin(page);
  await page.locator(loginPage.buttonLoginHeader).click();

  const signUpPage = new pageSignUp(page);
  await page.locator(signUpPage.buttonLoginSignUp).click();

  await page.locator(loginPage.fieldEmail).fill(testData.userLogin.emailValid);
  await page
    .locator(loginPage.fieldPassword)
    .fill(testData.userLogin.passwordInvalid);
  await page.locator(loginPage.buttonLoginPage).click();

  await expect(page.getByText("Wrong email or password")).toBeVisible();
});

test("Login with non-existent user email", async ({ page }) => {
  test.setTimeout(50000);
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);

  const consentPopupWindow = new consentPopup(page);
  await consentPopupWindow.clickButtonConsent();

  const loginPage = new pageLogin(page);
  await page.locator(loginPage.buttonLoginHeader).click();

  const signUpPage = new pageSignUp(page);
  await page.locator(signUpPage.buttonLoginSignUp).click();

  await page
    .locator(loginPage.fieldEmail)
    .fill(testData.userLogin.emailUnexistent);
  await page
    .locator(loginPage.fieldPassword)
    .fill(testData.userLogin.passwordValid);
  await page.locator(loginPage.buttonLoginPage).click();

  await expect(
    page.getByText("This email doesn't match any account. Try again.")
  ).toBeVisible();
});
