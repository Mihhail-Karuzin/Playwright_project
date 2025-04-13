import { test, expect } from "@playwright/test";
import { URLs } from "../Common/URLs";

test("Login with valid credentials", async ({ page }) => {
  // Step 1: Navigate to the website
  //await page.goto("https://www.testing101.net/");
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
});

test("Login with empty fields of the Login form", async ({ page }) => {
  // Step 1: Navigate to the website
  //await page.goto("https://www.testing101.net/");
  await page.goto(URLs.pageLinkHomePage);
  await page.waitForTimeout(5000);
  //Click on the Consent button on Cookie pop-up
  await page.getByRole("button", { name: "Consent" }).click();
  //Click on the Login button on the header
  await page.getByRole("button", { name: "Log In" }).click();
  //Click on the Login button on the Signup page
  await page.getByTestId("signUp.switchToSignUp").click();
  //Click on the Login button of the Login form
  await page.getByTestId("buttonElement").click();
  // Assertion to check the error message of the Email field
  await expect(page.getByText("Email cannot be blank")).toBeVisible();
  // await expect(page.getByText("Email can be blank")).toBeVisible();
  // Assertion to check the error message of the Password field
  await expect(page.getByText("Make sure you enter a password.")).toBeVisible();
});

test("Login with an empty Email field of the Login form", async ({ page }) => {
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
  //Input valid data into the Password field
  await page.getByRole("textbox", { name: "Password" }).fill("123456789");
  //Click on the Login button of the Login form
  await page.getByTestId("buttonElement").click();
  // Assertion to check the error message of the Email field
  await expect(page.getByText("Email cannot be blank")).toBeVisible();
});

test("Login with an empty Password field of the Login form", async ({
  page,
}) => {
  // Step 1: Navigate to the website
  //await page.goto("https://www.testing101.net/");
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
  //Click on the Login button of the Login form
  await page.getByTestId("buttonElement").click();
  // Assertion to check the error message of the Password field
  await expect(page.getByText("Make sure you enter a password.")).toBeVisible();
});

test("Login with the invalid format of the Email", async ({ page }) => {
  // Step 1: Navigate to the website
  //await page.goto("https://www.testing101.net/");
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
    .fill("mihhailkaruzin%gmail.com");
  //Input valid data into the Password field
  await page.getByRole("textbox", { name: "Password" }).fill("123456789");
  //Click on the Login button of the Login form
  await page.getByTestId("buttonElement").click();
  // Assertion to check the error message of the Email field
  await expect(
    page.getByText("Double check your email and try again.")
  ).toBeVisible();
});

test("Login with the invalid Password", async ({ page }) => {
  // Step 1: Navigate to the website
  //await page.goto("https://www.testing101.net/");
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
  await page.getByRole("textbox", { name: "Password" }).fill("1_23456789");
  //Click on the Login button of the Login form
  await page.getByTestId("buttonElement").click();
  // Assertion to check the error message of Password field
  await expect(page.getByText("Wrong email or password")).toBeVisible();
});

test("Login with non-existent user email", async ({ page }) => {
  // Step 1: Navigate to the website
  //await page.goto("https://www.testing101.net/");
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
    .fill("mihhailkaruzinn@gmail.com");
  //Input valid data into the Password field
  await page.getByRole("textbox", { name: "Password" }).fill("123456789");
  //Click on the Login button of the Login form
  await page.getByTestId("buttonElement").click();
  // Assertion to check a non-existent user Email error message
  await expect(
    page.getByText("This email doesn't match any account. Try again.")
  ).toBeVisible();
});
