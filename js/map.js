window.onload = function () {
    var map = L.map('maDiv').setView([48.858376, 2.294442],5);

    var couche = new L.StamenTileLayer("watercolor");
    map.addLayer(couche);

    var list;
    list = europe;
    $('#Europe').click(function(){
        list = europe;
    });
    $('#Afrique').click(function(){
        list = afrique;
    });

    //fonction qui calcule la distance entre 2 point 
    function distance(lat1,lon1,lat2,lon2) {
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2-lat1) * Math.PI / 180;
        var dLon = (lon2-lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        if (d>1) return Math.round(d)+"km";
        else if (d<=1) return Math.round(d*1000)+"m";
        return d;
    }
    console.log(distance(list[2].coor[0],list[2].coor[1],32.774114, 3.275551));
    //fonction création de popup
    function creationPopup(e, data){
        var popup = L.popup();
				popup 
					.setLatLng(e.latlng)
					.setContent(data.address.country+'<br />'
					+ e.latlng.toString()+'<br />'+data.address.country_code)	
					.openOn(map);
    }


    function creeZoneTexte(e, data, objet){
        var div = $('<div>');
        div
            .css({
            "overflow-y": "scroll",
            "color" : "Black",
            "background-color" : "white",
            "width" : "600px",
            "height" : "400px"
        })
        .html(objet.desc)
        .appendTo("#rep");
        var img = $('<img>');
        img .attr("src",objet.photo)
            .appendTo(div);
    }
    

    
    var j = 0;
    $('#lancer').click(function(e){
        e.preventDefault();
        
            $('#rep').empty();
            $('#comp').empty();
            $('#comp').append(list[j].pays);
            $('<img>').attr('src',list[j].img).appendTo('#comp');   
    });
    
    
    
    map.on('click', onClick);
    var nbClick = 0;
    var nbClickTot = 0;
    var bonneRep = 0;
	function onClick(e) {
		// On recherche ici le pays sur lequel on a clické
		// e contient automatiquement la lat/lon (e.latlng)
		// Requete AJAX de type GET pour récupérer les infos du pays sur le point où on a cliqué (lati, longi) 
		$.ajax({
		    type: 'GET',
		    url: "http://nominatim.openstreetmap.org/reverse",
		    dataType: 'jsonp',
		    jsonpCallback: 'data',
		    data: { format: "json", limit: 1,lat: e.latlng.lat,lon: e.latlng.lng,json_callback: 'data' },
		    error: function(xhr, status, error) {
				alert("ERREUR "+error);
			},
		    success: function(data){
				console.log(data);
				console.log(data.address.country_code);  
				

            for(var i=0;i<245;i++){
                
                if(state.features[i].properties.cca2== data.address.country_code ){
                    console.log(state.features[i]);
                   var res = state.features[i];
                }
            }

            // le cas ou il a la bonne réponse :
            if(data.address.country == list[j].pays){
                $('#rep').append('Bonne réponse<br />');
                $
                var layer = L.geoJson(res).addTo(map);
                var pop = creationPopup(e, data);
                console.log(pop);
                creeZoneTexte(e,data, list[j]);
                $('#next').click(function(e){
                    e.preventDefault();
                    $('#rep').empty();
                });
                nbClickTot++;
                bonneRep++;
                j++;
                $('#comp').empty();
                $('#comp').append(list[j].pays);
                $('<img>').attr('src',list[j].img).appendTo('#comp');
                nbClick =0;
                
            }
            else{
               var dis = distance(list[j].coor[0],list[j].coor[1],e.latlng.lat, e.latlng.lng);
                $('#rep').append('NAAAH !<br /> vous êtes loin de '+ dis+"<br />");
                nbClick++;
                nbClickTot++;
            }
            if( nbClick>4){
               j++;
                $('#comp').empty();
                $('#comp').append(list[j].pays);
                $('<img>').attr('src',list[j].img).appendTo('#comp');
                nbClick =0;
                chargement(list,j);
            }
            console.log(nbClickTot);
           // $('#rep').empty();
            
        
			}
        });
        console.log(list.length);
    }
    if(j == list.length){
        $('#fin').append("<h3>quiz fini : vous avez eu : "+bonneRep+" en : "+nbClickTot);
    }
    

   

}
