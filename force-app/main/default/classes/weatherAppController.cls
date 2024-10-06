public with sharing class weatherAppController {
    
    @AuraEnabled
    public static string getWeatherDetails(String input){
        String API_KEY = APIKeyController.getAPIKey('WeatherAPIKey');
        String url = 'https://api.openweathermap.org/data/2.5/weather?q='+input+'&units=metric&appid='+API_KEY;
        String response = getResponse(url);
        return response;
    }
    public static String getResponse(String url){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();

        req.setMethod('GET');
        req.setEndpoint(url);
        req.setTimeout(120000);

        res = h.send(req);

        String responseBody = res.getBody();
        return responseBody;
    }
}