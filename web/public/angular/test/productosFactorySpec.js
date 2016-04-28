describe('productos Factory test', function() {
    //var windowMock;
    var prod;
    
    beforeEach(module('app'));
    beforeEach(inject(function(productosFactory){
        prod = productosFactory();
    }));
    it('remover producto', function () {
        var arr = [{obj1: "hola"},{obj2: "jonas"}];
        var producto = {obj2: "jonas"};
        
        spyOn(prod, "removerProducto").and.returnValue([{obj1: "hola"}]);
        
        var result = prod.removerProducto(producto);
        expect(prod.removerProducto).toHaveBeenCalledWith(producto);
        expect(result).toEqual([{obj1: "hola"}]);
    });
    it('agregar Producto', function () {
        var arr = [{texto: "hola"}];
        var producto = {texto2: "jonas"};
        
        spyOn(prod, "agregarProducto").and.returnValue(undefined);
        
        var result = prod.agregarProducto(arr,producto);
        expect(prod.agregarProducto).toHaveBeenCalledWith(arr,producto);
        expect(result).toBe(undefined);
    });
    it('borrar productos', function () {
        var productos = [{texto: "hola"}];
        var arrayVacio = [];
        
        spyOn(prod, "borrarProductos").and.returnValue(arrayVacio);
        
        var result = prod.borrarProductos(productos);
        expect(prod.borrarProductos).toHaveBeenCalledWith(productos);
        expect(result).toBe(arrayVacio);
    });
});