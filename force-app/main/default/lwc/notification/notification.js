import { LightningElement, api} from 'lwc';

export default class Notification extends LightningElement {
    showNotification = false
    message
    varient

    get notifyClasses(){
        let varientClass = this.varient === 'success' ? 'slds-theme_success':
                            this.varient === 'warning' ? 'slds-theme_warning':
                            this.varient === 'error' ? 'slds-theme_error':'slds-theme_info'
        return `slds-notify slds-notify_toast ${varientClass}`
    }
    @api showToast(message, varient){
        this.message = message || "Please pass your Message"
        this.varient = varient || 'success'
        this.showNotification = true
        setTimeout(()=>{
            this.showNotification = false
        },5000)
    }
}