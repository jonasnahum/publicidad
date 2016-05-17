describe('app controller', function() {
    
    beforeEach(module('app'));
    var loc = undefined;
    var rCh = undefined;
    var $controller = undefined;
    beforeEach(function() {
        
        var $locationMock = {
            saved: undefined,
            uri: undefined,
            hash: function(id){
                $locationMock.saved = id;
            },
            path: function(){
                return $locationMock.uri;
            }
        };
        
        
        module(function ($provide) {
            $provide.value('$location',$locationMock);
         });
    });
    
    beforeEach(inject(function($location){
        loc = $location;
    }));
    
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    })); 
    
    
    it('is private method works responds true', function() {
        let ctrl = $controller("AppController")
        loc.uri = '/privado/todos';
        let result = ctrl.isPrivate();
        expect(result).toBe(true);
    });
    /*
    it('is private method works responds false', function(){
        loc.uri = '/jonas';
        let result = rCh.isPrivate();
        expect(result).toBe(false);
    });
    
    it('isactive method return true', function(){
        loc.uri = '/jonas';
        let result = rCh.isActive('/jonas');
        expect(result).toBe(true);
    });
    
    it('isactive method return false', function(){
        loc.uri = '/jonas';
        let result = rCh.isActive('/rodrigo');
        expect(result).toBe(false);
    });
    */
});