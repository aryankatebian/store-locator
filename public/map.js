mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJrYXRlIiwiYSI6ImNrNHd2N2dlNzA2ZnEzdG1sbmF1NGNnZW0ifQ.9mnyVOqqC08Hx7p_7Amzig';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [-0.118092, 51.509865]
});

//fetch store

async function getStore() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();
  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeID,
        icon: 'shop'
      }
    };
  });
  loadMap(stores);
}

function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
          //   features: [
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'Point',
          //         coordinates: [-0.118092, 51.509865]
          //       },
          //       properties: {
          //         storeId: '0001',
          //         icon: 'shop'
          //       }
          //     }
          //   ]
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}
getStore();
