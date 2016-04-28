describe('link Factory test', function() {
    
    var link;
    
    beforeEach(module('app'));
    beforeEach(inject(function(linkFactory){
        link = linkFactory();
    }));
    it('remover link', function () {
        var link1 = "link1";
        var link2 = "link2";
        var arr = [link1,link2];
        
        spyOn(link, "removerLink").and.returnValue([link1]);
        
        var result = link.removerLink(arr,link2);
        expect(link.removerLink).toHaveBeenCalledWith(arr, link2);
        expect(result).toEqual([link1]);
    });
    it('agregar Link', function () {
        var link1 = "link1";
        var link2 = "link2";
        var arr = [link1,link2];
        var val = undefined;
        
        spyOn(link, "agregarLink").and.returnValue(val);
        
        var result = link.agregarLink(arr,link2);
        expect(link.agregarLink).toHaveBeenCalledWith(arr,link2);
        expect(result).toBe(val);
    });

    it('borrar links', function () {
        var link1 = "link1";
        var link2 = "link2";
        var arr = [link1,link2];
        var linkVacio = undefined;
        
        spyOn(link, "borrarLinks").and.returnValue(linkVacio);
        
        var result = link.borrarLinks(arr);
        expect(link.borrarLinks).toHaveBeenCalledWith(arr);
        expect(result).toBe(linkVacio);
    });
});