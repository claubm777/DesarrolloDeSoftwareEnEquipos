/* ========================================================================
 * Copyright 2014 g9
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 g9

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['controller/_profesorController','delegate/profesorDelegate'], function() {
    App.Controller.ProfesorController = App.Controller._ProfesorController.extend({
 postInit: function(options) {
            var self = this;
            this.listAniosVinculacionTemplate = _.template($('#profesorAniosVinculacionList').html());
            this.listAniosVinculacionModelClass = options.listModelClass;
     },
     _renderAniosVinculacion: function() {
            var self = this;
            /*Aqu� se utiliza el efecto gr�fico backbone deslizar. �$el� hace referencia al <div id=�main�> ubicado en el index.html. Dentro de este div se despliegue la tabla.*/
            this.$el.slideUp("fast", function() {
                /*Establece que en el <div> se despliegue el template de la variable ��. Como par�metros entran las variables establecidas dentro de los tags <%%> con sus valores como un objeto JSON. En este caso, la propiedad sports tendr� la lista que instanci� �sportSearch� en la variable del bucle <% _.each(sports, function(sport) { %>*/
 
                self.$el.html(self.listAniosVinculacionTemplate({profesors: self.profesorAniosVinculacionModelList.models}));
                self.$el.slideDown("fast");
            });
        },
        profesorAniosVinculacion: function(params) {
        //Elementos para invocar el servicio getSports
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' + 'instead-profesor-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-profesor-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-profesor-list', {view: this, data: data});
                var self = this;
                if (!this.profesorModelList) {
                    this.profesorModelList = new this.listModelClass();
                }
                //se obtienen los deportes del servicio getSports
                this.profesorModelList.fetch({
                    data: data,
                    success: function() {
                        var elementos = self.profesorModelList.models;
                        //Ahora se instancia el nuevo modelo construido
                        self.profesorAniosVinculacionModelList = new App.Model.ProfesorAniosVinculacionList;
                        //Se itera sobre la variable elementos, que corresponden a la lista de modelos obtenida del servico REST getSports
                        _.each(elementos, function(d) {
                            //Se hace el c�lculo del nuevo campo
                            var fechaV=d.attributes.fechaVinculacion;
                            
                            var fecha1=new Date(parseInt(fechaV.substring(6,10)),parseInt(fechaV.substring(3,5))-1,parseInt(fechaV.substring(0,2)));
          
                            var minutes = 1000 * 60;
                            var hours = minutes * 60;
                            var days = hours * 24;
                            var years = days * 365;
                            var da = new Date();
                            var t = da.getTime();
                            var p =fecha1.getTime();

                            var y1 = t / years;
                            var y2 = p / years;
                            var res=Math.floor(y1-y2);
                            var aniosVinculacion = res;
                            /*Ahora se instancia un SportPromModel, con un nuevo objeto JSON como par�metro como constructor (antes sportModel), extrayendo los datos de �d�.*/
                            var model = new App.Model.ProfesorAniosVinculacionModel({name: d.attributes.name, aniosVinculacion: aniosVinculacion});
                            //y se agrega finalmente a los modelos prom de la lista.
                            self.profesorAniosVinculacionModelList.models.push(model);
                        });
                        //Se invoca la funci�n de renderizado para que muestre los resultados en la nueva lista.
                        self._renderAniosVinculacion(params);
                        Backbone.trigger(self.componentId + '-' + 'post-profesor-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'profesor-list', view: self, error: error});
                    }
                });
            }
        }
     
    });
    return App.Controller.ProfesorController;
}); 