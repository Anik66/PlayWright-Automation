import jsonData from '../Utils/userData.json'
const latestUser = jsonData[ jsonData.length - 1 ];

class ResetPage{
    constructor(page){
        
        this.page=page
        this.ClickResetLink = page.locator('a', { hasText: 'Reset it here' })
        this.InputFile=page.locator('input[type="email"]')
        this.SentButton=page.getByRole('button', { name: 'Send Reset Link' })


    }

    async resetpassword(){
        
        
       await this.ClickResetLink.click();
       await this.InputFile.fill(latestUser.email)
       await this.SentButton.click()

        
    }

}

export default ResetPage