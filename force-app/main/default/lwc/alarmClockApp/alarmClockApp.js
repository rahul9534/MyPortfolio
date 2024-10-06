import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssetsUpdated'
export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets+'/AlarmClockAssets/AlarmClockAssets/clock.png';
    ringtone = new Audio(AlarmClockAssets+'/AlarmClockAssets/AlarmClockAssets/iphone_alarm.mp3');
    currentTime = ''
    hours = []
    minutes =[]
    meridians = ['AM','PM']
    alarmTime = ''
    isAlarmSet = false
    isAlarmTriggered = false

    hourSelected = ''
    minuteSelected = ''
    meridianSelected = ''
    get isFieldSelected(){
        return !(this.hourSelected && this.minuteSelected && this.meridianSelected)
    }
    get shakeImage(){
        return this.isAlarmTriggered ? 'shake' : ''
    }
    connectedCallback(){
        this.createHourOptions()
        this.createMinutesOptions()
        this.currentTimeHandler()
    }
    currentTimeHandler(){
        setInterval(()=>{
            let dateTime = new Date();
            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = "AM"

            if(hour === 0){
                hour = 12
                ampm = "AM"
            }else if(hour === 12){
                ampm = 'PM'
            }else if(hour >= 12){
                hour = hour - 12
                ampm = 'PM'
            }
            hour == hour<10 ? "0"+hour : hour 
            min == min<10 ? "0"+min : min 
            sec == sec<10 ? "0"+sec : sec 
            this.currentTime = `${hour}:${min}:${sec} ${ampm}`
            if(this.alarmTime === `${hour}:${min} ${ampm}`){
                this.isAlarmTriggered = true
                this.ringtone.play()
                this.ringtone.loop = true
            }
        },1000)
        
    }
    createHourOptions(){
        for(let i = 0;i<=12; i++){
            let val = i<10 ? "0"+i : i;
            this.hours.push(val);
        }
    }
    createMinutesOptions(){
        for(let i = 0;i<60; i++){
            let val = i<10 ? "0"+i : i;
            this.minutes.push(val);
        }
    }
    optionhandler(event){
        const {label,value} = event.detail
        if(label === "Hour(s)"){
            this.hourSelected = value
        }else if(label === "Minute(s)"){
            this.minuteSelected = value
        }else if(label === "AM/PM"){
            this.meridianSelected = value
        }else{}
        console.log('hourSelected',this.hourSelected)
        console.log('minutesSelected',this.minuteSelected)
        console.log('meridianSelected',this.meridianSelected)
    }
    setAlarmHandler(){
        this.alarmTime = `${this.hourSelected}:${this.minuteSelected} ${this.meridianSelected}`
        console.log('alarmTime',this.alarmTime)
        this.isAlarmSet = true
    }
    clearAlarmHandler(){
        this.alarmTime = ''
        this.isAlarmSet = false
        this.isAlarmTriggered = false
        this.ringtone.pause()
        const elements = this.template.querySelectorAll('c-clock-dropdown')
        Array.from(elements).forEach(element=>{
            element.reset('')
        })
    }
}