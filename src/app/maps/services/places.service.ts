import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined
  public isLoadingPLaces: boolean = false
  public places: Feature[] = []
  private mapService = inject(MapsService)

  get isUserLocationReady(): boolean {

    return !!this.userLocation;
  }

  private placesApiCLient = inject(PlacesApiClient)


  constructor() {

    this.geUserLocation()
  }

  geUserLocation(): Promise<[number, number]> {


    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {

          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation)
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion')
          console.log(err)
        }
      )
    })


  }

  getPlacesByQuery(query: string = '') {

    //todo: evaluar cunado el query es nulo 

    if (query.length === 0) {
      this.isLoadingPLaces = false
      this.places = []
      return
    }

    if (!this.userLocation) throw Error('La ubicacion no esta disponible')

    if (!this.userLocation) throw Error('NO hay localizacion')

    this.isLoadingPLaces = true

    this.placesApiCLient.get<PlacesResponse>(`${query}.json`, {

      params: {
        proximity: this.userLocation!.join(','),

      }
    })

      .subscribe(resp => {
        this.isLoadingPLaces = false
        this.places = resp.features
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!)

      })

  }
}
