import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";


test("Login with new password", async ({ page }) => {

    const latestUser = jsonData[ jsonData.length - 1 ];

    try {
        await page.goto("https://dailyfinance.roadtocareer.net/", { waitUntil: "load", timeout: 10000 });
    } catch (error) {
        console.error("Navigation failed:", error.message);
    }

    //await page.goto("/");
    const login = new LoginPage(page);
    await login.loginUser(latestUser.email , latestUser.password);
    


});