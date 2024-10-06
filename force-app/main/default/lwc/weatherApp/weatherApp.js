import { LightningElement } from 'lwc';
import getApikey from '@salesforce/apex/APIKeyController.getAPIKey';
import WEATHER_ICON from '@salesforce/resourceUrl/weatherAppIcons';
import getWeatherDetails from '@salesforce/apex/weatherAppController.getWeatherDetails';

export default class WeatherApp extends LightningElement {
    clearIcon = WEATHER_ICON + '/weatherAppIcons/clear.svg'
    cloudIcon = WEATHER_ICON + '/weatherAppIcons/cloud.svg'
    dropletIcon = WEATHER_ICON + '/weatherAppIcons/droplet.svg'
    hazeIcon = WEATHER_ICON + '/weatherAppIcons/haze.svg'
    mapIconc = WEATHER_ICON + '/weatherAppIcons/map.svg'
    rainIcon  = WEATHER_ICON + '/weatherAppIcons/rain.svg'
    snowIcon = WEATHER_ICON + '/weatherAppIcons/snow.svg'
    stormIcon = WEATHER_ICON + '/weatherAppIcons/storm.svg'
    thermometer = WEATHER_ICON + '/weatherAppIcons/thermometer.svg'
    arrowBackIcon = WEATHER_ICON + '/weatherAppIcons/arrow-back.svg'

    cityName = ''
    apiKey = ''
    APIConfigName = 'WeatherAPIKey'
    loadingText = ''
    isError = false
    response
    weatherIcon

    get loadingClasses(){
        return this.isError ? 'error-msg' : 'success-msg'
    }
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
    searchHanler(event){
        this.cityName = event.target.value;
    }
    backHandler(event){
        this.response = null
        this.cityName = ''
        this.loadingText = ''
        this.error = false
        this.weatherIcon = ''
    }
    submitHandler(event){
        event.preventDefault();
        this.fetchData()
    }

    fetchData(){
        this.isError = false
        this.loadingText = 'Fetching weather details...'
        console.log('City Name',this.cityName)
        getWeatherDetails({input:this.cityName})
            .then(result=>{
                this.weatherDetails(JSON.parse(result))
            })
            .catch((error)=>{
                console.error('error',error)
                this.loadingText = 'Something went wrong'
                this.isError = true
            })

        //Below is client side calling
        /*const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${this.apiKey}`
        console.log(url)
        fetch(url).then(res=>res.json()).then(result=>{
            console.log(JSON.stringify(result))
            this.weatherDetails(result)
        }).catch((error)=>{
            console.error('error',error)
            this.loadingText = 'Something went wrong'
            this.isError = true
        })*/
    }
    weatherDetails(info){
        if(info.cod === '404'){
            this.isError = true
            this.loadingText = `${this.cityName} isn't a valid city name` 
        }else{
            this.loadingText = ''
            this.isError = false
            const city = info.name
            const country = info.sys.country
            const {description, id} = info.weather[0]
            const {temp, feels_like, humidity} = info.main
            if(id === 800){
                this.weatherIcon = this.clearIcon
            }else if((id >= 200 && id <= 232) || (id <= 600 && id <= 622)){
                this.weatherIcon = this.stormIcon
            }else if(id >= 701 && id <= 781){
                this.weatherIcon = this.hazeIcon
            }else if(id >= 801 && id <= 804){
                this.weatherIcon = this.cloudIcon
            }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
                this.weatherIcon = this.rainIcon
            }else{
                
            }
            
            this.response = {
                city : city,
                temperature : Math.floor(temp),
                description :description,
                location : `${city}, ${country}`,
                feels_like: Math.floor(feels_like),
                humidity : `${humidity}`,



            }
        }
    }
}