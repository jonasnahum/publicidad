describe('Signup publico controller test', function() {
    
    var $controller;
    var u;
    var loc;
    
    beforeEach(module('app'));
    
    
    beforeEach(inject(function(_$controller_, usuariosProxy, $location){
        $controller = _$controller_;
        u = usuariosProxy;
        loc = $location;
    }));

    it('signup method test', function() {
        var SignupController = $controller('SignupPublicoController');
        var data = {_id: 33};
        
        spyOn(SignupController, "signup");
        spyOn(SignupController, "callback");
        spyOn(loc, "path");
        
        SignupController.signup();
        SignupController.callback(data);
     
        expect(SignupController.signup).toHaveBeenCalled();
        expect(SignupController.callback).toHaveBeenCalledWith(data);
    });

});