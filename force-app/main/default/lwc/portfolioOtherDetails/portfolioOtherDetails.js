import { api, LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SUPERBADGE_FIELD from '@salesforce/schema/Portfolio__c.Superbadges__c';
import AWARDS_FIELD from '@salesforce/schema/Portfolio__c.Awards__c';
import LANGUAGE_FIELD from '@salesforce/schema/Portfolio__c.Languages__c';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
export default class PortfolioOtherDetails extends LightningElement {
    awardIcon = `${PortfolioAssets}/PortfolioAssets/trophy.png`
    languageIcon = `${PortfolioAssets}/PortfolioAssets/language.png`
    badgeIcon = `${PortfolioAssets}/PortfolioAssets/badge.png`
    @api recordId
    superbadges = []
    awards = []
    languages = []

    @wire(getRecord, {
        recordId:'$recordId',
        fields:[AWARDS_FIELD, SUPERBADGE_FIELD, LANGUAGE_FIELD]
    })otherFieldHandler({data,error}){
        if(data){
            console.log('Other Details Data: ', JSON.stringify(data))
            this.formatData(data)
        }
        if(error){
            console.error('Other Details Error ',error)
        }
    }

    formatData(data){
        const {Awards__c,Superbadges__c,Languages__c} = data.fields
        this.superbadges = Superbadges__c && Superbadges__c.value ? Superbadges__c.value.split(';'):[]

        this.awards = Awards__c && Awards__c.value ? Awards__c.value.split(','):[]
        this.languages = Languages__c && Languages__c.value ? Languages__c.value.split(','):[]
    }
}