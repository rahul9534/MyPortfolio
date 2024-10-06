import { LightningElement, wire } from 'lwc';
import { countryCodeList } from "c/countryCodeList";
import getApikey from '@salesforce/apex/APIKeyController.getAPIKey';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'
export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg'
    countryList = countryCodeList
    APIConfigName = 'CurrencyConverterAPIKey'
    countryFrom = 'USD'
    countryTo = 'AUD'
    amount
    result
    error 
    apiKey = ''

    connectedCallback(){
        this.retrieveAPIKey();
    }
    retrieveAPIKey(){
        getApikey({APIConfigName : this.APIConfigName})
            .then((result) =>{
                this.apiKey = result;
                console.log('Data',this.apiKey)
            })
            .catch((error) =>{
                console.log('Error fetching API Key')
            });
        }
    
    
    handleChange(event){
        const {name, value} = event.target
        console.log("name",name)
        console.log("value",value)
        if(name === 'amount'){
            this[name] = Number(value)
        }else{
            this[name] = value
        }
        this.result = ''
        this.error = ''
    }
    submitHandler(event){
        event.preventDefault();
        this.convert()
    }
    async convert(){
        const API_URL = `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${this.countryFrom}/${this.countryTo}`
        try{
          const data = await fetch(API_URL)
          const jsonData = await data.json()
          console.log(jsonData)
          this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
          console.log(this.result)
        } catch(error){
          console.log(error)
          this.error="An error occurred. Please try again..."
        }
      }
}