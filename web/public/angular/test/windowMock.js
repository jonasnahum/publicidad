(function() {
    windowMock = {
        document:{
            getElementById: function(element){
                return {element};
            }
        },
        google : {
            maps:{
                eventListener: undefined,
                MapTypeId: {
                    ROADMAP: "road"
                },
                LatLng: function (lat, long){
                    return {lat,long}
                },
                Map: function (document, mapOptions) {
                    return {document, mapOptions};
                },
                event:{
                    addListener: function (map, name, callback){
                        windowMock.google.maps.eventListener={map,name,callback};
                        return {map,name,callback}
                    }
                },
                Marker: function(){

                }
            }
        },
        localStorage: {
            obj: [],
            getItem: function(name){
                return windowMock.localStorage.obj[name];
            },
            setItem: function(name, json) {
                windowMock.localStorage.obj[name] = json;
            }
        }

    }
})();