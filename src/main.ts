import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzdHI5MyIsImEiOiJjbTJjdzJ2a3MxNXBiMmxyMjd5YWxlNjZrIn0.nG6ZozV5UZv2BrJMMuVtcw';


if (!navigator.geolocation) {

  alert('Navegador no soporta la geolocalizacion')
  throw console.error('la geolocalizacion no es soprotada');


}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
