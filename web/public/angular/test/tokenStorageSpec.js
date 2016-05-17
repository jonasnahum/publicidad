describe('tokenStorage test', function() {
    //var windowMock;
    var tokenStorage;
    
    beforeEach(module('app'));
    beforeEach(inject(function(tokenStorage){
        tokenStorage = tokenStorage.clearToken();
    }));

    it('getToken method', inject(function (tokenStorage) {
        var expected = {token: '123asd'};
        
        expect(tokenStorage.getToken()).toBeUndefined();
        
        tokenStorage.setToken(expected);
        expect(tokenStorage.getToken()).toEqual(expected);
        
        tokenStorage.clearToken();
        expect(tokenStorage.getToken()).toBeUndefined();
        
        expect(tokenStorage.getAccessHeader()).toBe('');
    
        tokenStorage.setToken(expected);
        expect(tokenStorage.getAccessHeader()).toBe(expected.token);
    
    }));
    it('getEmail method', inject(function (tokenStorage) {
        var email = "jonasnahum@gmail.com";
        var expected = {token: '123asd', user: {email: email}};
        tokenStorage.setToken(expected);
        expect(tokenStorage.getEmail()).toBe(email);
        tokenStorage.clearToken();
        expect(tokenStorage.getEmail()).toBe('No hay email');
    }));
    it('getEmail id', inject(function (tokenStorage) {
        var email = "jonasnahum@gmail.com";
        var id = 31;
        var expected = {token: '123asd', user: { email: email, _id: id }};
        tokenStorage.setToken(expected);
        expect(tokenStorage.getId()).toBe(id);
        tokenStorage.clearToken();
        expect(tokenStorage.getId()).toBe('No hay _id');
    }));
});