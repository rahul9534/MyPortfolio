import { api, LightningElement } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
    @api recordId
    @api objectApiName
    @api resumeUrl

    downloadResume(event){
        window.open(this.resumeUrl,"_bnank")
        //"https://github.com/rahul9534/Rahul_Resume/raw/main/Rahul_Resume.pdf"
    }

}