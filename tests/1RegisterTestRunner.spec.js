import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json'
import fs from 'fs'
import { faker } from '@faker-js/faker';
import {generateRandomId} from '../Utils/utils.js';
import RegisterPage from "../pages/RegisterPage.js";
//import { getGmailList, readMail } from "../pages/getGmailList.js"


test("User can register successfully", async ({ page }) => {
    await page.goto("/");
    
    await expect(
      page.getByRole("heading", { name: "Welcome to daily finance" })
    ).toBeVisible();

    const reg = new RegisterPage(page);

    const userData = {
        firstName :faker.person.firstName() ,
        lastName: faker.person.lastName(),
        email: "anikkumardas966+" +generateRandomId(1000, 9999)  + "@gmail.com" ,
        password: "12345" ,
        phoneNumber: `015${generateRandomId(10000000, 99999999)}`,
        address: faker.location.city()
      };

      await reg.registerUser(userData);

      const toastLocator = page.locator('.Toastify__toast');

    toastLocator.waitFor();

    const msg =await toastLocator.textContent();
    expect(msg).toContain("successfully!");


    await page.waitForTimeout(7000);

    
    
   jsonData.push(userData);

   fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 

   await page.waitForTimeout(7000);


   let mailId = process.env.MAIL_ID || await getGmailList();
       if (!mailId) {
           throw new Error("Failed to fetch Gmail list.");
       }
   
       let mailBody = process.env.MAIL_BODY || await readMail(mailId);
       if (!mailBody) {
           throw new Error("Failed to read reset password email.");
       }

       const match = mailBody.match(/Welcome to our platform!/);
      const extractedText = match ? match[0] : null;
      console.log("Extracted Text:", extractedText);


        
       const expectedPartialMessage = "Welcome to our platform!";
       expect(extractedText).toContain(expectedPartialMessage );

    

    //await page.pause();


});


