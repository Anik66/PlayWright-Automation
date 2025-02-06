

class AddItem {
    constructor(page) {
        this.page = page;

        this.ItemName = page.getByLabel("Item Name");
        this.ItemAmount = page.getByLabel("Amount");
        this.Purchasedate = page.getByLabel("Purchase Date");
        this.Month = page.locator("#month");
        this.Remarks = page.getByLabel("Remarks");
        
    }

    async adddata(user) {
        await this.ItemName.fill(user.ItemName);
        await this.ItemAmount.fill(user.ItemAmount);
        await this.Purchasedate.fill(user.Purchasedate);
        await this.Month.selectOption({ index: 1 }); 
        await this.Remarks.fill(user.Remarks);
        
    }
}

export default AddItem


