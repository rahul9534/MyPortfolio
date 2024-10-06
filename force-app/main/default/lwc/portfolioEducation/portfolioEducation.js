import { api, LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
const COLUMNS = [
    { label: 'Education', fieldName: 'Education' },
    { label: 'Institution Name', fieldName: 'Institution' },
    { label: 'Passing Year', fieldName: 'PassingYear' }
];
export default class PortfolioEducation extends LightningElement {

    @api recordId
    tableData = []
    columns = COLUMNS

    @wire(getRelatedListRecords,{
        parentRecordId:'$recordId',
        relatedListId:'Educations__r',
        fields:[
                    'Education__c.InstitutionName__c',
                    'Education__c.PassingYear__c',
                    'Education__c.Title__c'
                ],
        sortBy:['Education__c.PassingYear__c']
    })EducationHandler({data,error}){
        if(data){
            console.log('Education Data', JSON.stringify(data))
            this.formatData(data)
        }
        if(error){
            console.error('Education Error',error)
        }
    }
    formatData(data){
        this.tableData = [...data.records].reverse().map(item=>{
            let Id = item.id
            const {InstitutionName__c,PassingYear__c,Title__c} = item.fields
            let Education = Title__c.value
            let Institution = InstitutionName__c.value
            let PassingYear = PassingYear__c.value

            return {Id, Education, Institution, PassingYear}
        })

        console.log('tableData: ',JSON.stringify(this.tableData))
    }
}