import { LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
export default class PortfolioPersonalProjects extends LightningElement {
    BMICalculator = `${PortfolioAssets}/PortfolioAssets/Projects/BMICalculator.png`
    AlarmClock = `${PortfolioAssets}/PortfolioAssets/Projects/AlarmClock.png`
    CurrencyCalculator = `${PortfolioAssets}/PortfolioAssets/Projects/CurrencyCalculator.png`
    WeatherApp = `${PortfolioAssets}/PortfolioAssets/Projects/WeatherApp.png`
    Survey = `${PortfolioAssets}/PortfolioAssets/Projects/Survey.png`
    NoteApp = `${PortfolioAssets}/PortfolioAssets/Projects/NoteApp.png`
    
    projects=[
        {
            "name":"BMI Calculator App",
            "img":this.BMICalculator,
            "link":"https://rk-portfolio-dev-ed.develop.my.site.com/bmi-calculator"
        },
        {
            "name":"Alarm Clock App",
            "img":this.AlarmClock,
            "link":"https://rk-portfolio-dev-ed.develop.my.site.com/alarm-clock"
        },
        {
            "name":"Currency Converter App",
            "img":this.CurrencyCalculator,
            "link":"https://rk-portfolio-dev-ed.develop.my.site.com/currency-converter"
        },
        {
            "name":"Weather App",
            "img":this.WeatherApp,
            "link":"https://rk-portfolio-dev-ed.develop.my.site.com/weather-app"
        },
        {
            "name":"Survey App",
            "img":this.Survey,
            "link":"https://rk-portfolio-dev-ed.develop.my.site.com/survey/survey/runtimeApp.app?invitationId=0KidM0000000eLd&surveyName=employee_survey&UUID=daebb4a4-b361-4af1-abcf-a41958f57ce0"
        },
        {
            "name":"Note Taking App",
            "img":this.NoteApp,
            "link":"https://rk-portfolio-dev-ed.develop.my.site.com/note-taking-app"
        }
    ]
}