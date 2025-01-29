import { LoginPage } from "../../Pages/login.page";

export class LoginUtils {
    constructor(private loginpage: LoginPage) {}

    async loginAsSuperadmin(email: string, password: string, orgname: string) {
        try {
            // Updated to use the new navigateAndLogin method
            await this.loginpage.navigateAndLogin(email, password);
            await this.loginpage.loginsuccessful();
            await this.loginpage.checkforpendoGuideandClose();
            await this.loginpage.fetchTheOrgnamefromNavBar();
            await this.loginpage.switchToDesiredorg(orgname);
        } catch (error) {
            throw new Error(`Login as superadmin failed: ${error}`);
        }
    }

    async loginAsUser(email: string, password: string) {
        try {
            // Updated to use the new navigateAndLogin method
            await this.loginpage.navigateAndLogin(email, password);
            await this.loginpage.loginsuccessful();
            await this.loginpage.checkforpendoGuideandClose();
        } catch (error) {
            throw new Error(`Login as Non-superadmin failed: ${error}`);
        }
    }
}