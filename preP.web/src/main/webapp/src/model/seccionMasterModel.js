define(['model/_seccionMasterModel'], function() { 
    App.Model.SeccionMasterModel = App.Model._SeccionMasterModel.extend({
        
        
        
       initialize: function() {
            this.on('invalid', function(model,error) {
                Backbone.trigger('seccion-master-model-error', error);
            });
        },
        validate: function(attrs, options){
            var modelMaster = new App.Model.SeccionModel();
            if(modelMaster.funcionara){
            	return modelMaster.funcionara(attrs.seccionEntity,options);
            }
            
            
            
        }
   

    });

    App.Model.SeccionMasterList = App.Model._SeccionMasterList.extend({
        model: App.Model.SeccionMasterModel
    });
    

    return  App.Model.SeccionMasterModel;

});