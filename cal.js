    var map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    var marker = null;
    var route = L.polyline([], {color:'blue'}).addTo(map);
    let once = true;

    if('geolocation' in navigator)
    {
        navigator.geolocation.watchPosition(pos =>
        {
            const lati = pos.coords.latitude;
            const longi = pos.coords.longitude;

            if(once)
            {
                map.setView([lati,longi],13);
                once = false;
            }
            if(marker)
            {
                map.removeLayer(marker);
            }
            marker=L.marker([lati,longi]).addTo(map);
            route.addLatLng([lati,longi]);
        },error =>
        {
            console.error("Geolocation not available",error);
        },
        {
            enableHighAccuracy:true
        }
        );
    }
    else
    {
        console.log("Error");
    }