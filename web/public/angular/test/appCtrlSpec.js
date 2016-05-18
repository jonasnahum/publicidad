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
                if (arguments.length){
                    $locationMock.uri = arguments[0];
                }
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
    
    it('is private method works responds false', function(){
        let ctrl = $controller("AppController")
        loc.uri = 'todosPublico';
        let result = ctrl.isPrivate();
        expect(result).toBe(false);
    });
    
    it('isactive method return true', function(){
        let ctrl = $controller("AppController")
        loc.uri = '/jonas';
        let result = ctrl.isActive('/jonas');
        expect(result).toBe(true);
    });
    it('isactive method return false', function(){
        let ctrl = $controller("AppController")
        loc.uri = '/jonas';
        let result = ctrl.isActive('/rodrigo');
        expect(result).toBe(false);
    });
    it("logout returns false", function(){
        let ctrl = $controller("AppController")
        let result = ctrl.logout();
        expect(result).toBe(false);
    });
    it("logout changes location path", function(){
        let ctrl = $controller("AppController");
        let result = ctrl.logout();
        expect(loc.uri).toBe("/");
    });
});