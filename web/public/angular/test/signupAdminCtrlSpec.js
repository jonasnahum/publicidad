describe('Signup Admin controller test', function() {
    
    var $controller;
    var aP;
    var loc;
    
    beforeEach(module('app'));
    
    
    beforeEach(inject(function(_$controller_, adminsProxy, $location){
        $controller = _$controller_;
        aP = adminsProxy;
        loc = $location;
    }));
    
    it('login method test', function() {
        var SignupController = $controller('SignupController');
     
        spyOn(aP, "signup");
        spyOn(loc, "path");
        
        SignupController.signup();
     
        expect(aP.signup).toHaveBeenCalled();
        
    });

});