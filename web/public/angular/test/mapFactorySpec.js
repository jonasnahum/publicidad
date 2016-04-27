describe('mapFactory test', function() {
    
    beforeEach(module('app'));
    
    beforeEach(function() {
    /*    
        windowMock = {
            document:{
                getElementById: function(element){
                    return {element};
                }
            },
            google : {
                maps:{
                    eventListener: undefined,
                    MapTypeId: {
                        ROADMAP: "road"
                    },
                    LatLng: function (lat, long){
                        return {lat,long}
                    },
                    Map: function (document, mapOptions) {
                        return {document, mapOptions};
                    },
                    event:{
                        addListener: function (map, name, callback){
                            windowMock.google.maps.eventListener={map,name,callback};
                            return {map,name,callback}
                        }
                    },
                    Marker: function(){
                        
                    }
                }
            }
        }
      */  module(function ($provide) {
            $provide.value('$window', windowMock);
        });
    });
    
    it('get map options methd', inject(function (mapFactory) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        expected= {
            center: {lat: 19.412288699925995, long: -102.0718502998352}, 
            zoom: 13, 
            mapTypeId: 'road'
        };
        expect(mapa.getMapOptions()).toEqual(expected);
    }));
    it('get map methd has document and map options', inject(function (mapFactory) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        
        expected= {
            document: {
                element: 'googleMap'
            },
            mapOptions: {
                center: {lat: 19.412288699925995, long: -102.0718502998352},
                zoom: 13, 
                mapTypeId: 'road'}
        }
        expect(mapa.getMap()).toEqual(expected);
    }));
    it('get event listener method puts an object on  enventListener property', inject(function (mapFactory) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        mapa.getEventListener();
        expect(mapa.eventListener).toEqual(windowMock.google.maps.eventListener);
    }));
    it('manageevents saves lat and long properties, anda calls clearoverlays metod and placeMarker method ', inject(function (mapFactory) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        var event = {
            latLng: {
                lat : function () {
                    return parseFloat(19.412288699925995);
                },
                lng : function () {
                    return parseFloat(-102.0718502998352);
                },
            }
        }
        spyOn(mapa, "clearOverlays");
        spyOn(mapa, "placeMarker")
        mapa.manageEvent(event)
        expect(mapa.clearOverlays).toHaveBeenCalled();
        expect(mapa.placeMarker).toHaveBeenCalledWith(latitud,longitud);
        expect(mapa.lat).toBe(event.latLng.lat());
        expect(mapa.long).toBe(event.latLng.lng());
        
        
    }));
    it('place marker method and clearoverlays method', inject(function (mapFactory, $window) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        //está vacio markersArray
        expect(mapa.markersArray).toEqual([]);   
        var response = {setMap : function(algo){}};//para que sireva clearoverlys
        //Se crea un marker cuando se llama el metodo place marker
        spyOn($window.google.maps, "Marker").and.returnValue(response);
        mapa.placeMarker(latitud,longitud);
        expect($window.google.maps.Marker).toHaveBeenCalled();
        //lo más importante, se guarda el marker
        expect(mapa.markersArray[0]).toEqual(response);
        //no se borra lo guardado para que sirva clear overlays
        spyOn(mapa.markersArray[0],"setMap");
        mapa.clearOverlays();
        expect(mapa.markersArray[0].setMap).toHaveBeenCalled();
        //se borra lo guardado.
        mapa.markersArray = [];
    }));
    it('borrar marker', inject(function (mapFactory, $window) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        spyOn(mapa,"clearOverlays");
        mapa.borrarMarker();
        expect(mapa.lat).toBe(undefined);
        expect(mapa.long).toBe(undefined);
        expect(mapa.clearOverlays).toHaveBeenCalled();
        expect(mapa.markersArray).toEqual([]);
    }));
    it('getLat', inject(function (mapFactory) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        
        expect(mapa.getLat()).toBe(19.412288699925995);
    }));
    
    it('getLong', inject(function (mapFactory) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);
        
        expect(mapa.getLong()).toBe(-102.0718502998352);
    }));
});