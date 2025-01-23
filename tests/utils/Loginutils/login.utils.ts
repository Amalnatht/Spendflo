import {LoginPage} from "../../Pages/login.page";

export class LoginUtils {
    constructor(private loginpage : LoginPage){
        // this.loginpage = loginpage;
    }

    async loginAsUser(email : string, password : string, orgname : string){
        await this.loginpage.NavigatetoSpendflo();
        await this.loginpage.enterEmailandContinue(email);
        await this.loginpage.enterPasswordandSigin(password); 
        await this.loginpage.checkforskipfornowbuttonandclick();
        await this.loginpage.loginsuccessful();
        await this.loginpage.checkforpendoGuideandClose();
        let result = await this.loginpage.fetchTheOrgnamefromNavBar();
        if(result){
          await this.loginpage.switchToDesiredorg(orgname);
        }
        else{
          console.log("User logged in as non superadmin")
        }

   
    }


}