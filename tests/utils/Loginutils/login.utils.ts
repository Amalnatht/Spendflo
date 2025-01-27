import { LoginPage } from "../../Pages/login.page";

export class LoginUtils {
    constructor(private loginpage: LoginPage) {}

    async loginAsSuperadmin(email: string, password: string, orgname: string) {
        try {
            await this.loginpage.NavigatetoSpendflo();
            await this.loginpage.enterEmailandContinue(email);
            await this.loginpage.enterPasswordandSigin(password);
            await this.loginpage.checkforskipfornowbuttonandclick();
            await this.loginpage.loginsuccessful();
            await this.loginpage.checkforpendoGuideandClose();
            await this.loginpage.fetchTheOrgnamefromNavBar();
            await this.loginpage.switchToDesiredorg(orgname);
        } catch (error) {
            throw new Error(`Login as superadmin failed ${error}`);
        }
    }

    async loginAsUser(email: string, password: string) {
        try {
            await this.loginpage.NavigatetoSpendflo();
            await this.loginpage.enterEmailandContinue(email);
            await this.loginpage.enterPasswordandSigin(password);
            await this.loginpage.checkforskipfornowbuttonandclick();
            await this.loginpage.loginsuccessful();
            await this.loginpage.checkforpendoGuideandClose();
        } catch (error) {
            throw new Error(`Login as Non superadmin failed ${error}`);
        }
    }
}