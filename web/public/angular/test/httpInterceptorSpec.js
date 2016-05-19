describe('http interceptor test', function() {
    var qMock;
    var locationMock;
    var tokenStorageMock;
    
    beforeEach(module('app'));
    
    beforeEach(function() {
        qMock = {
            rejection : undefined,
            reject: function (rejection){
                qMock.rejection = rejection
            }
        }
        locationMock = {
            stringPath : undefined,
            path: function (path){
                if(path){
                    locationMock.stringPath = path;
                }
                return locationMock.stringPath;
            }
        };
        tokenStorageMock = {
            obj: undefined,
            getToken: function() {
                return tokenStorageMock.obj;
            },
            getAccessHeader: function() {
                //return tokenStorageMock.obj.token;
                var tokenObj = tokenStorageMock.getToken();
                if (tokenObj) {
                    return tokenObj.token;
                }
                return '';
            }
        };

        module(function ($provide) {
            $provide.value('$q', qMock);
            $provide.value('$location', locationMock);
            $provide.value('tokenStorage', tokenStorageMock);
        });
    });
    
    it('public request returns obj with headers["x-access-token"] equal to string', 
        inject(function (httpInterceptor, routeChecker) {
        locationMock.stringPath="publico";
        var token = {token: 'safd'};
        tokenStorageMock.obj = token;
        var request = {headers: {}};
        var actual =httpInterceptor.request(request).headers["x-access-token"];
       
        expect(actual).toEqual(token.token);
    }));

    it('private request  and token undefined so locationpath = /signin', 
        inject(function (httpInterceptor) {
        locationMock.stringPath="/privado/todos";
        var token = undefined;
        tokenStorageMock.obj = token;
        
        var request = {headers: {}};
        var actual = httpInterceptor.request(request).headers["x-access-token"];
        
        expect(locationMock.path()).toBe("/signin");
    }));
    
    it('private request  whit token so x access token has an string', 
        inject(function (httpInterceptor) {
        locationMock.stringPath="/privado/todos";
        var token = {token: 'safd'};;
        tokenStorageMock.obj = token;
        
        var request = {headers: {}};
        var actual = httpInterceptor.request(request).headers["x-access-token"];
        
        expect(actual).toEqual(token.token);
    }));
    it('responseError recives an rejection object with status property === 401, so is redirected to /signin, and q.reject recives an object rejection', inject(function (httpInterceptor) {
        var rejection = {status: 401};
        httpInterceptor.responseError(rejection);
        var actual = locationMock.stringPath;
        var expected = "/signin";
        expect(actual).toEqual(expected);
        expect(qMock.rejection).toEqual(rejection);
    }));
    
    it('responseError recives an rejection object with status !property === 401, so is  not redirected to /signin, and q.reject recives an object rejection', inject(function (httpInterceptor) {
        var rejection = {status: 200};
        httpInterceptor.responseError(rejection);
        var actual = locationMock.stringPath;
        expect(actual).toBeUndefined();
        expect(qMock.rejection).toEqual(rejection);
    }));
});