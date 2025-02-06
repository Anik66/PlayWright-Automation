import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";
import AddItem from "../pages/AddItem.js"

test("User can Log in successfully", async ({ page }) => {

    const latestUser = jsonData[ jsonData.length - 1 ];

    try {
        await page.goto("https://dailyfinance.roadtocareer.net/", { waitUntil: "load", timeout: 10000 });
    } catch (error) {
        console.error("Navigation failed:", error.message);
    }

    //await page.goto("/");
    const login = new LoginPage(page);
    await login.loginUser(latestUser.email , latestUser.password);
    await expect(page.getByText('User Daily Costs')).toBeVisible()
    await page.locator('.add-cost-button').click()    

     
    const additem = new AddItem(page)

    const ItemData ={
        ItemName :"1st installment",
        ItemAmount:"3000",
        Purchasedate:"2025-02-03",
        Month:"1",
        Remarks:"Best SQA Course in bangladesh"

    }
       await additem.adddata(ItemData)

    
    

    

    


     await page.waitForTimeout(3000);
    await page.locator(".submit-button").click()
    //handling alert
    page.on('dialog',async dialog =>{
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain("Product added successfully!")
        await dialog.accept();
    })

    //add 2nd item
    await page.locator('.add-cost-button').click()  

    const additem1 = new AddItem(page)

    const ItemData1 ={
        ItemName :"Last Installment",
        ItemAmount:"2500",
        Purchasedate:"2024-12-03",
        Month:"11",
        Remarks:"500 tk casshback"

    }

    await additem1.adddata(ItemData1)

    

    await page.waitForTimeout(3000);
    await page.locator(".submit-button").click()

   


     await expect(page.getByText('Total Rows: 2')).toBeVisible()

     await expect(page.getByText('Total Cost: 5500 TK')).toBeVisible()

   
    




    

});