describe('mapFactory test', function() {
    
    beforeEach(module('app'));
    
    beforeEach(function() {
        google.maps.MapTypeId.ROADMAP
        googleMock = {
            maps:{
                MapTypeId: {
                    ROADMAP
                },
                LatLng: function (lat, long){
                    return {lat,long}
                }
            }
        };
        
        module(function ($provide) {
            $provide.value('google', googleMock);
        });

    });
    
    it('getmapoptions methd', inject(function (mapFactory) {
        var latitud = parseFloat(19.412288699925995);
        var longitud = parseFloat(-102.0718502998352);
        var mapa = mapFactory(latitud,longitud);


        
        console.dir(mapa);
      //  expect(mapFactory.getMapOptions()).toEqual("hola");
    }));
    
});