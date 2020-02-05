var mymap = L.map('worldmap', 
            {
              center: [48.866667, 2.333333],
              zoom: 4
            }
);


var customIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',

    iconSize:     [38, 38], 

    iconAnchor:   [19, 39],

    popupAnchor:  [0, -50]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


$('li').each(function() {
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    var name = $(this).data('name').charAt(0).toUpperCase() + $(this).data('name').slice(1);

    L.marker([lat, lon], {icon: customIcon}).addTo(mymap).bindPopup(`${name}`);;
})


// https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png