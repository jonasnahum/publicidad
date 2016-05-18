describe('error Log', function() {
    
    beforeEach(module('app'));
    var eL;
    var log;
    var loc;
    beforeEach(function() {
        
        var $logMock =  {
            uno:undefined,
            dos:undefined,
            tres:undefined,
            cuatro:undefined,
            error: function(uno,dos,tres,cuatro){
                $logMock.uno=uno;
                $logMock.dos=dos;
                $logMock.tres=tres;
                $logMock.cuatro=cuatro;
            }
            
        };
        
        var $locationMock =  {
            str:undefined,
            path: function(stri){
                $locationMock.str = stri;
            }
        };
        
        
        module(function ($provide) {
            $provide.value('$log',$logMock);
            $provide.value('$location',$locationMock);
        });
    });
    beforeEach(inject(function(errorLog, $log, $location){
        eL = errorLog;
        log = $log;
        loc = $location;
    }));
    
    
    it('factory recives parameters', function() {
        let data = "data";
        let status = "401";
        let headers = "cabeza";
        let config = {method:"jonas", url:"honas"};
        let statusText = "statusText";
        eL(data,status,headers,config,statusText);
        expect(log.uno).toBe("%s %s %s");  
        expect(log.dos).toBe("jonas");  
        expect(log.tres).toBe("honas");  
        expect(log.cuatro).toBe("401");  
    }); 
    
    it('factory without config', function() {
        let data = "data";
        let status = "401";
        let headers = "cabeza";
        let config = {method:"jonas", url:"honas"};
        let statusText = "statusText";
        eL(data,status,headers);
        expect(log.uno).toBe("error");  
    });    
    
    it('factory executes location.path', function() {
        let data = "data";
        let status = "401";
        let headers = "cabeza";
        let config = {method:"jonas", url:"honas"};
        let statusText = "statusText";
        eL(data,status,headers);
        expect(loc.str).toBe("/error");  
    });    
});