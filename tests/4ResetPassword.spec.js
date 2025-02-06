import { test, expect } from "@playwright/test";
import ResetPage from "../pages/ResetPage";
import { ReadGmailList, readMail } from "../pages/ReadGmailList";
import dotenv from 'dotenv';

dotenv.config();

test("User can reset password successfully", async ({ page }) => {
    await page.goto("/");
    
    const reset = new ResetPage(page);
    await reset.resetpassword();  // Trigger password reset request
    
    // Wait for some time to allow email delivery
    await page.waitForTimeout(5000);

    // Get the reset password email
    let mailId = process.env.MAIL_ID || await ReadGmailList();
    if (!mailId) {
        throw new Error("Failed to fetch Gmail list.");
    }

    let mailBody = process.env.MAIL_BODY || await readMail(mailId);
    if (!mailBody) {
        throw new Error("Failed to read reset password email.");
    }

    console.log("Actual Email Body:", mailBody);


    // Extract the reset password link (assuming it's inside the email body)
    const resetLink = mailBody.match(/https?:\/\/[^\s]+/)[0];
    console.log("Reset Password Link:", resetLink);

    // Navigate to reset link

    await page.waitForTimeout(10000);
    await page.goto(resetLink);


    await page.locator('input[type="password"]').nth(0).fill("1234");  
    await page.locator('input[type="password"]').nth(1).fill("1234");  

    await page.locator('button[type="submit"]').click()

    
   

  // await page.pause();
});
