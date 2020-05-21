window.onload = function () {

    var map = L.map('maDiv').setView([48.858376, 2.294442],5);

    var couche = new L.StamenTileLayer("watercolor");
    map.addLayer(couche);

    console.log(quiz);
    // choix des 5 pays pour chaque questionnaire 
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    
    }
    function tabAleatoirContinent(){
        var tab = [11,11,11,11,11];
        var i = 0;
        while(i < 5){
            var cmp = 0;
            var n = getRandomInt(10);
            for(var j =0 ; j<5; j++ ){
                if(n == tab[j]){
                    cmp ++;
                }
            }
            if(cmp == 0){
                tab[i] = n;
                i++
            }
        }
        return tab;
    }
    function tabAleatoirMonde(){
        var tab = [51,51,51,51,51];
        var i = 0;
        while(i < 5){
            var cmp = 0;
            var n = getRandomInt(50);
            for(var j =0 ; j<5; j++ ){
                if(n == tab[j]){
                    cmp ++;
                }
            }
            if(cmp == 0){
                tab[i] = n;
                i++
            }
        }
        return tab;
    }

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
        if (d>1) return Math.round(d);
        else if (d<=1) return Math.round(d*1000);
        return d;
    }

    function recherche(data){ // pour chercher un pays dans notre base countries.geojson
        for(var i=0;i<245;i++){
                        
            if(state.features[i].properties.cca2== data.address.country_code ){
                console.log(state.features[i]);
            var res = state.features[i];
            }
        }
        return res;
    }

    //fonctions pour choisir le continent et zoomer dessus
    var questionnaire ; // création de la variable qui contiendra le quiz
    var index;  //pour choisir 5 pays aléatoir
    $('#europe').click(function(e){
        e.preventDefault();
        questionnaire = quiz[0];
        index = tabAleatoirContinent();
        console.log(questionnaire);
        console.log(index);
        map.setView([questionnaire.Coordonees[0], questionnaire.Coordonees[1]],4);
    
    });

    $('#afrique').click(function(e){
        e.preventDefault();
        questionnaire = quiz[1];
        index = tabAleatoirContinent();
        console.log(questionnaire);
        console.log(index);
        map.setView([questionnaire.Coordonees[0], questionnaire.Coordonees[1]],3);
        
    });

    $('#amerique').click(function(e){
        e.preventDefault();
        questionnaire = quiz[2];
        index = tabAleatoirContinent();
        console.log(questionnaire);
        console.log(index);
        map.setView([questionnaire.Coordonees[0], questionnaire.Coordonees[1]],2);
        
    });

    $('#oceanie').click(function(e){
        e.preventDefault();
        questionnaire = quiz[3];
        index = tabAleatoirContinent();
        console.log(questionnaire);
        console.log(index);
        map.setView([questionnaire.Coordonees[0], questionnaire.Coordonees[1]],3);
        
    });

    $('#asie').click(function(e){
        e.preventDefault();
        questionnaire = quiz[4];
        index = tabAleatoirContinent();
        console.log(questionnaire);
        console.log(index);
        map.setView([questionnaire.Coordonees[0], questionnaire.Coordonees[1]],2);
        
    });

    $('#monde').click(function(e){
        e.preventDefault();
        questionnaire = quiz[5];
        index = tabAleatoirMonde();
        console.log(questionnaire);
        console.log(index);
        map.setView([questionnaire.Coordonees[0], questionnaire.Coordonees[1]],2);
        
    });

    // fonction creation de zone de text
    function creeZoneTexte(e, data, objet){
        var div = $('<div>');
        div
            .css({
            "overflow-y": "scroll",
            "color" : "Black",
            "background-color" : "white",
            "width" : "1050px",
            "height" : "500px"
        })
        .html(objet.iso +"<br />"+objet.desc+'<br />')
        .appendTo("#rep");
        var flag = $('<img>');
        flag.attr("src",objet.img)
            .prependTo(div);
        var img = $('<img>');
        img .attr("src",objet.photo)
            .appendTo(div);
    }

    // lancer le jeu :
    var score; 
    var j =0 ; // pour acceder aux élement de l'index
    $('#lancer').click(function(e){
        score = 0 ;
        j=0;
        nbClick = 0;  // variable nombre de clique par question 
        nbClickFaux = 0; // variable nombre de clique au total 
        bonneRep = 0; // nombre de bonne réponse 
        distanceMin =[0,0,0,0,0] ; // pour compter le score selon la distance 
        e.preventDefault();
        console.log(questionnaire);
        console.log(index);
        $("#quiz").empty();
        $('#quiz').append('trouver le pays dont le drapeau est : <br />');
        $('<img>').attr('src',questionnaire.quiz[index[j]].img).appendTo('#quiz');

    });

    var nbClick = 0;  // variable nombre de clique par question 
    var nbClickFaux = 0; // variable nombre de clique au total 
    var bonneRep = 0; // nombre de bonne réponse 
    var distanceMin =[0,0,0,0,0] ; // pour compter le score selon la distance 

    //fonction calcule de score 
    function calculeScore(nbClickFaux, bonneRep, distanceMin){
        var score = 0;
        score += (20*(bonneRep));
        score -= (3*(nbClickFaux));
        for(var i = 0; i<distanceMin.length; i++){
            if(distanceMin[i] == 0){ // rien faire car c'est une bonne réponse par conséquant les points sont déja atribuer en haut
            }
            if(distanceMin[i]<1000){
                score += 10;
            }
            if(distanceMin[i]>1000 && distanceMin[i]<2000){
                score += 6;
            }
            if(distanceMin[i]>2000 && distanceMin[i]<3000){
                score += 3;
            }
            else{
                score += 0;
            }

        }
                 
        return score;

    }
    // fonction terminer pour finir le quiz
    function terminer(score){
        $("#quiz").empty();
        $('#quiz').append('le quiz est términer votre score est :'+score+' <br />');
    }

        map.on('click', onClick);
        function onClick(e) {
        // On recherche ici le pays sur lequel on a clické
            // e contient automatiquement la lat/lon (e.latlng)
            // Requete AJAX de type GET pour récupérer les infos du pays sur le point où on a cliqué (lati, longi) 
            if(1){
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
                            console.log(data.address.country);
                            
                            var pays = recherche(data); //chercher le pays cliqué dans countries.geojson
                            console.log(pays);
                            var actuel = questionnaire.quiz[index[j]]; // selectionne le pays actuel
                            console.log(actuel.pays)
                            // dans le cas ou le pays cliqué est le bon 
                            if(data.address.country == actuel.pays){
                                $('#rep').append('Bonne réponse<br /> Apuyez sur next pour enlever le texte ');
                                var layer = L.geoJson(pays).addTo(map);
                            // var pop = creationPopup(e, data);
                            // console.log(pop);
                                creeZoneTexte(e,data, actuel);
                                $('#next').click(function(e){
                                    e.preventDefault();
                                    $('#rep').empty();
                                });
        
                                    bonneRep++;
                                    j++;
                                    console.log(questionnaire.quiz[index[j]]);
                                    $('#quiz').empty();
                                    $('#quiz').append(questionnaire.quiz[index[j]]);
                                    $('<img>').attr('src',questionnaire.quiz[index[j]].img).appendTo('#quiz');
                                    nbClick =0;    
                                    distanceMin[j] = 0;// pour remettre a 0 la distance car le joueur a trouvé
                                
                            }
                            // s'il n'as pas trouver et qu'il a encore des cliques
                            else{
                                
                                    var dis = distance(actuel.coor[0],actuel.coor[1],e.latlng.lat, e.latlng.lng);
                                    $('#rep').append('NAAAH !<br /> vous êtes loin de '+ dis+"km<br />");
                                    nbClick++;
                                    nbClickFaux++;
                                    distanceMin[j] = dis;// pour retenir la dérnière distance 
                            }

                            if( nbClick>4){
                                    $('#rep').append('mauvaise réponse <br /> Apuyez sur skip pour enlever le texte et passer');
                                    $('#rep').empty();
                                    j++;
                                    $('#quiz').empty();
                                    $('#quiz').append(questionnaire.quiz[index[j]]);
                                    $('<img>').attr('src',questionnaire.quiz[index[j]].img).appendTo('#quiz');
                                    nbClick =0;

                                
                            }
                            $('#skip').click(function(e){
                                e.preventDefault();
                                $('#rep').empty();
                                j++;
                                $('#quiz').empty();
                                $('#quiz').append(questionnaire.quiz[index[j]]);
                                $('<img>').attr('src',questionnaire.quiz[index[j]].img).appendTo('#quiz');
                                nbClick =0;

                            })
                    
                            
                    }
                
                });
            } 
            
            
            
            
        }
    $('#finir').click(function(e){
        score = calculeScore(nbClickFaux,bonneRep,distanceMin);
        e.preventDefault();
        terminer(score);
        $.ajax({
            url : 'score.php',
            type : 'POST', // Le type de la requête HTTP, ici devenu POST
            data : 'scor=' + score , // On fait passer nos variables, exactement comme en GET, au script more_com.php
            dataType : 'text'
         });
         alert(score);
         $('#rejouer').click(function(e){
            location.reload();
        });
    });

    
    

    
    

    $('#scoreb').click(function(e){
        if(document.getElementById('score').style.display == 'none'){
            document.getElementById('score').style.display = 'block';
        }
        else{
            document.getElementById('score').style.display = 'none';
        }
    });
    


}