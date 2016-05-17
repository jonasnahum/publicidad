describe('about test', function() {
    
    beforeEach(module('app'));
    var $controller = undefined;
    var mF = undefined;
    var aS = undefined;
    var loc = undefined;
    beforeEach(function() {
        
        var $locationMock = {
            saved: undefined,
            hash: function(id){
                $locationMock.saved = id;
            }
        };
        
        var mapFactoryMock = function(lat, long){
            var obj = {
                lat:lat,
                long:long,
                placeMarker: function(lat,long){
                    obj.lat = lat;
                    obj.long= long;
                }
            }
            return obj;
        };
            
        var $anchorScrollMock = function(){
            return {message:"hola"};
        };
        
        module(function ($provide) {
            $provide.value('$location',$locationMock);
            $provide.value('mapFactory',mapFactoryMock);
            $provide.value('$anchorScroll',$anchorScrollMock);
        });
    });
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function(mapFactory){
        mF = mapFactory(2,3);
    }));
    
    beforeEach(inject(function($anchorScroll){
        aS = $anchorScroll;
    }));
    
    beforeEach(inject(function($location){
        loc = $location;
    }));
    
    it('get map saves coordenates on instance', function() {
        var ctrl = $controller("AboutController");
        ctrl.getMap();
        expect(mF.lat).toBe(2);
        expect(mF.long).toBe(3);    
    });
    
    it('scrollto call anchorScroll', function() {
        var ctrl = $controller("AboutController");
        ctrl.scrollTo(12);
        expect(aS().message).toBe("hola");
    });
    
    it('scrollto call locationhash', function() {
        var ctrl = $controller("AboutController");
        ctrl.scrollTo(12);
        expect(loc.saved).toBe(12)

    });
    
});