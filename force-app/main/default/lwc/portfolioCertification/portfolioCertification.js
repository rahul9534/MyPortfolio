import { api, LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SF_CERT_FIELDS from '@salesforce/schema/Portfolio__c.SalesforceCertifications__c';
import OTHER_CERT_FIELDS from '@salesforce/schema/Portfolio__c.OtherCertifcation__c';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';

export default class PortfolioCertification extends LightningElement {
    certLogo = `${PortfolioAssets}/PortfolioAssets/cert_logo.png`
    @api recordId
    sfCertsList = []
    otherCertsList = []

    @wire(getRecord, {
        recordId:'$recordId',
        fields:[SF_CERT_FIELDS, OTHER_CERT_FIELDS]
    })certsHandler({data,error}){
        if(data){
            console.log('Certification Data', JSON.stringify(data))
            this.formatData(data)
        }if(error){
            console.log('certHandler error'.error)
        }
    }
    formatData(data){
        const {SalesforceCertifications__c,OtherCertifcation__c} = data.fields
        this.sfCertsList = SalesforceCertifications__c? SalesforceCertifications__c.value.split(';').map(item=>{
            return `Salesforce Certified ${item}`
        }):[]

        this.otherCertsList = OtherCertifcation__c? OtherCertifcation__c.value.split(','):[]
        
    }
}