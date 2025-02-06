

class Uploadphoto{
    constructor(page){
        this.page=page;
        this.Openmenu=page.locator('.MuiIconButton-root')
        this.Profile=page.getByRole('menuitem', { name: 'Profile' })
        this.Editprofile=page.getByRole('button', { name: 'Edit' })
        this.InputFile =page.locator('input.upload-input');
        this.Uploadphoto=page.getByRole('button', { name: 'Upload Image' })
        this.Uploadbutton=page.getByRole('button', { name: 'Update' })
        this.Logout=page.getByRole('menuitem', { name: 'Logout' })
    }

    async addphoto(){
       await this.Openmenu.click()
       await this.Profile.click()
       await this.Editprofile.click()
       await this.InputFile.setInputFiles('D:/SDET/PlayWright_automation/Utils/Profileimage.jpg');
       await this.Uploadbutton.click()
       await this.page.waitForTimeout(3000);
       await this.Openmenu.click()
       await this.Logout.click()

    }
}

export default Uploadphoto;