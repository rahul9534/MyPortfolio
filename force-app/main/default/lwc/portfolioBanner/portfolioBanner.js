import { LightningElement, wire, api} from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
import profilePicAsset from '@salesforce/resourceUrl/profilePicAsset'
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import FULLNAME from '@salesforce/schema/Portfolio__c.FullName__c'
import COMPANY_NAME from '@salesforce/schema/Portfolio__c.CompanyName__c'
import DESIGNATION from '@salesforce/schema/Portfolio__c.Designation__c'
import COMPANY_LOCATION from '@salesforce/schema/Portfolio__c.CompanyLocation__c'

export default class PortfolioBanner extends LightningElement {
    @api recordId //= 'a03dM000005S1hRQAS'
    @api linkedinUrl //= 'https://www.linkedin.com/in/rahul-kumar-a11430130'
    @api twitterUrl //= ""
    @api githubUrl //= ""
    @api youtubeUrl //= ""
    @api trailheadUrl //= ""
    @api blogUrl //= ""

    userPic = `${profilePicAsset}/profilePicAsset/profilePic.jpg`
    linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`
    twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`
    github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`
    youtube = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`
    trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`
    blog = `${PortfolioAssets}/PortfolioAssets/Social/blog.svg`

    @wire(getRecord, {recordId: '$recordId', fields:[FULLNAME,COMPANY_LOCATION,COMPANY_NAME,DESIGNATION]})
    portfolioData //wire as a priperty
    
    //wire as a function
    // portfolioHandler({data, error}){
        //     if(data){
        //         console.log('Record Data', JSON.stringify(data))
        //     }
        //     if(error){
        //         console.log('error',error)
        //     }
        // }
    
    get fullName(){
        return getFieldValue(this.portfolioData.data, FULLNAME)
    }
    get designation(){
        return getFieldValue(this.portfolioData.data, DESIGNATION)
    }
    get companyLocation(){
        return getFieldValue(this.portfolioData.data, COMPANY_LOCATION)
    }
    get companyName(){
        return getFieldValue(this.portfolioData.data, COMPANY_NAME)
    }
    
}