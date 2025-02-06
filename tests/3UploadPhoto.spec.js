import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";
import Uploadphoto from "../pages/Uploadphoto.js";


test("User can upload photo successfully", async ({ page }) => {

    const latestUser = jsonData[ jsonData.length - 1 ];

    await page.goto("/");
    const login = new LoginPage(page);
    await login.loginUser(latestUser.email , latestUser.password);
    await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 5000 });

    await page.locator('.MuiIconButton-root').click()
    await page.getByRole('menuitem', { name: 'Profile' }).click()
    page.getByRole('button', { name: 'Edit' }).click()
    const inputFile = page.locator('input.upload-input')
    
  
    await inputFile.setInputFiles('D:/SDET/PlayWright_automation/Utils/Profileimage.jpg');

   await page.getByRole('button', { name: 'Upload Image' }).click()
  await page.getByRole('button', { name: 'Update' }).click()

  await page.locator('.MuiIconButton-root').click()
  await page.getByRole('menuitem', { name: 'Logout' }).click()
    

});

