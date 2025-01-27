import {LoginPage} from "../../Pages/login.page";

export class LoginUtils {
    constructor(private loginpage : LoginPage){
        this.loginpage = loginpage;// has no impact
    }

    // or 
    
    // private loginpage: LoginPage; // Declare the property

    // constructor(loginpage: LoginPage) {
    //     this.loginpage = loginpage; // Explicitly assign it
    // }

    // async url(){
    //     this.loginpage.
    // }

    async loginAsSuperadmin(email : string, password : string, orgname : string){
        await this.loginpage.NavigatetoSpendflo();
        await this.loginpage.enterEmailandContinue(email);
        await this.loginpage.enterPasswordandSigin(password); 
        await this.loginpage.checkforskipfornowbuttonandclick();
        await this.loginpage.loginsuccessful();
        await this.loginpage.checkforpendoGuideandClose();
        await this.loginpage.fetchTheOrgnamefromNavBar();
        await this.loginpage.switchToDesiredorg(orgname);

    }
    async loginAsUser(email : string, password : string){
      await this.loginpage.NavigatetoSpendflo();
      await this.loginpage.enterEmailandContinue(email);
      await this.loginpage.enterPasswordandSigin(password); 
      await this.loginpage.checkforskipfornowbuttonandclick();
      await this.loginpage.loginsuccessful();
      await this.loginpage.checkforpendoGuideandClose();

  }

}