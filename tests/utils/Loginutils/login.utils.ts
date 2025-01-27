import { LoginPage } from "../../Pages/login.page";

export class LoginUtils {
    constructor(private loginpage: LoginPage) {}

    async loginAsSuperadmin(email: string, password: string, orgname: string) :Promise<boolean> {
        try {
            // Updated to use the new navigateAndLogin method
            await this.loginpage.navigateAndLogin(email, password);
            await this.loginpage.loginsuccessful();
            await this.loginpage.checkforpendoGuideandClose();
            await this.loginpage.fetchTheOrgnamefromNavBar();
            await this.loginpage.switchToDesiredorg(orgname);
            return true;
        } catch (error) {
            console.log(`Login as superadmin failed ${error}`);
            return false;
        }

    }

    async loginAsUser(email: string, password: string):Promise<boolean> {
        try {
            // Updated to use the new navigateAndLogin method
            await this.loginpage.navigateAndLogin(email, password);
            await this.loginpage.loginsuccessful();
            await this.loginpage.checkforpendoGuideandClose();
            return true;
        } catch (error) {
            console.log(`Login as Non superadmin failed ${error}`);
            return false;
        }

    }
}