describe("correo controller", function(){
    var url = 'http://localhost:3000/correo/';
    
    beforeEach(module('app')); 
    
    var $controller; 
    var $httpMock; 
    var postHandler;

    beforeEach(function() {
/*        var errorLogMock = function(obj){
            return obj;
        };
*/        
        var scopeMock = {
            mailForm:{
                $setPristine:function(){
                    return true;
                }    
            }
        };
        module(function ($provide) {
            $provide.value('$scope',scopeMock);
  //          $provide.value('errorLog',errorLogMock);
        });
    });
    
    beforeEach(inject(function(_$controller_, errorLog){
        $controller = _$controller_;
//        eL.func = errorLog;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        postHandler = $httpBackend.when('POST', url).respond(false);
    }));
    
    it('sends', function() {
        var controller = $controller('EmailFormController');
        controller.name = "jonas";
        controller.email = "jonas@gmail.com";
        controller.phone = "4521652247";
        controller.message = "hola hola";
        controller.waiting = true;
        controller.success = function(obj){
            expect(obj.data).toBe(false);
        };
        
        controller.send("westpack@gmail.com");
        expect(controller.to).toBe("westpack@gmail.com");

        $httpMock.expectPOST(url);
        $httpMock.flush();
    });
    
    it('error log was called when sends fail', function() {
        var controller = $controller('EmailFormController');
        controller.name = "jonas";
        controller.email = "jonas@gmail.com";
        controller.phone = "4521652247";
        controller.message = "hola hola";
        controller.waiting = true;
        controller.success = function(){
            console.log("este mensaje de éxito no debería de verse en correocontrollerspec.js")
        };
        controller.errorLog = function(obj){
            expect(obj.data).toBe('Not found');
            expect(obj.status).toBe(404);
        };
        
        postHandler.respond(404, 'Not found');
        
        controller.send("westpack@gmail.com");
        
        $httpMock.expectPOST(url);
        $httpMock.flush();
    });
    
});