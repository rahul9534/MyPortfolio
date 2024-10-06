public with sharing class APIKeyController {
    @AuraEnabled
    public static string getAPIKey(String APIConfigName){
        API_Configuration__c apiConfig = API_Configuration__c.getInstance(APIConfigName);
        return apiConfig != null ? apiConfig.API_Key__c : null;
    }
    
}