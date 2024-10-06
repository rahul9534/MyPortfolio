public without sharing class NoteTakingController {
    @AuraEnabled
    public static Boolean createNoteRecord(String title, String description) {
        try{
            if(!String.isBlank(title)){
                My_Note__c myNote = new My_Note__c(Name = title, Note_Description__c = description);
                insert myNote;
                return true;
            }
            return false;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<My_Note__c> getNotes(){
        return [SELECT Id, Name, Note_Description__c, LastModifiedDate from My_Note__c order by LastModifiedDate desc];
    }

    @AuraEnabled
    public static Boolean updateNoteRecord(String noteId, String title, String description){
        try {
            if(!String.isBlank(noteId)){
                My_Note__c myNote = [SELECT Id, Name, Note_Description__c, LastModifiedDate from My_Note__c where Id =: noteId];
                myNote.Name = title;
                myNote.Note_Description__c = description;

                update myNote;
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static Boolean deleteNoteRecord(String noteId){
        try {
            if(!String.isBlank(noteId)){
                My_Note__c myNote = new My_Note__c(Id = noteId);
                delete myNote;

                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}