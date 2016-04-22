
describe('adminsProxy test', function() {
    var urlSignin = 'http://localhost:3000/admin/api/signin';
    var urlSignup = 'http://localhost:3000/admin/api/signup';
    var constantsMock;
    var $httpMock;
    
    beforeEach(module('app'));
    beforeEach(function() {
        constantsMock = {
            server: 'http://localhost:3000'
        };
        
        module(function ($provide) {
            $provide.value('constants', constantsMock);
        });

    });
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('POST', urlSignin).respond(true);
        $httpBackend.when('POST', urlSignup).respond(true);
       /* 
       $httpBackend.when('DELETE', url + id).respond(true);
       */
    }));
    
    it('create an instance for signin', inject(function (adminsProxy) {
        expect(adminsProxy.signinProxy.url).toEqual(urlSignin);
    }));
    
    it('create an instance for signup', inject(function (adminsProxy) {
        expect(adminsProxy.signupProxy.url).toEqual(urlSignup);
    }));
    it('signin method responds when its called', inject(function (adminsProxy) {
      
        adminsProxy.signin({nombre: "jonas"}, function(response){
            expect(response).toBe(true);
        })
        $httpMock.expectPOST(urlSignin);//post syncrono
        $httpMock.flush();    
         
    }));
    it('signun method responds when its called', inject(function (adminsProxy) {
      
        adminsProxy.signup({nombre: "jonas"}, function(response){
            expect(response).toBe(true);
        })
        $httpMock.expectPOST(urlSignup);//post syncrono
        $httpMock.flush();    
         
    }));
    
});