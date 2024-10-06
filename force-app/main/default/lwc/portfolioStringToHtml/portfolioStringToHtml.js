import { api, LightningElement } from 'lwc';

export default class PortfolioStringToHtml extends LightningElement {
    @api content
    isLoaded = false

    renderedCallback(){
        if(this.isLoaded){
            return false
        }

        console.log('content',this.content)
        if(this.content){
            this.isLoaded = true
            const container = this.template.querySelector('.htmlContainer')
            container.innerHTML = this.content
        }
    }

}