describe('Signin controller test', function() {
    
    var $controller;
    var aP;
    var tS;
    var loc;
    
    beforeEach(module('app'));
    
    
    beforeEach(inject(function(_$controller_, adminsProxy, tokenStorage, $location){
        $controller = _$controller_;
        aP = adminsProxy;
        tS = tokenStorage;
        loc = $location;
    }));
    
    it('login method test', function() {
        var SigninController = $controller('SigninController');
        var token = {email:"hola", password: "jonas"}
   
        spyOn(aP, "signin");
        spyOn(tS, "setToken");
        spyOn(loc, "path");
        
        
        SigninController.signin();
        SigninController.callback(token);
        
        expect(aP.signin).toHaveBeenCalled();
        expect(tS.setToken).toHaveBeenCalledWith(token);
        expect(loc.path).toHaveBeenCalledWith('/privado/todos');

    });

});