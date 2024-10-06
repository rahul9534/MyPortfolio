import { LightningElement,api } from 'lwc';

export default class PortfolioUserAndStatsWrapper extends LightningElement {
    @api recordId
    @api objectApiName
    @api badges
    @api points
    @api trails
    @api rank
    @api resumeUrl
}