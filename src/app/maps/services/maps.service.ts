import { inject, Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map: Map | undefined
  private markers: Marker[] = []

  private directionsApi = inject(DirectionsApiClient)

  get isMapReady() {
    return !!this.map
  }

  setMap(map: Map) {

    this.map = map
  }

  flyTo(coords: LngLatLike) {

    if (!this.isMapReady) throw Error('El mapa no esta inicializado')

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })

  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if (!this.map) throw Error('Mapa no disponible')

    this.markers.forEach(marker => marker.remove())

    const newMarkers = []

    for (const place of places) {

      const lng = place.properties.coordinates.longitude
      const lat = place.properties.coordinates.latitude

      const popup = new Popup()
        .setHTML(
          `<h6>${place.properties.full_address}</h6>
        <span>${place.properties.name}</span>
        `);
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map)

      newMarkers.push(newMarker)

    }

    this.markers = newMarkers
    if (places.length === 0) return;

    //* LIMITES DEL MAPA

    const bounds = new LngLatBounds();

    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));

    bounds.extend(userLocation)

    this.map.fitBounds(bounds, {
      padding: 200
    })


  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {

    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => console.log(resp))


  }



}
