import { Component, inject } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-resolve',
  templateUrl: './search-resolve.component.html',
  styleUrl: './search-resolve.component.css'
})
export class SearchResolveComponent {


  public selectedId: string = ''
  private placesService = inject(PlacesService)
  private mapsService = inject(MapsService)

  get isLoadingPLaces(): boolean {

    return this.placesService.isLoadingPLaces;
  }


  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {

    this.selectedId = place.id

    const lng = place.properties.coordinates.longitude
    const lat = place.properties.coordinates.latitude

    this.mapsService.flyTo([lng, lat])


  }



  getDirections(place: Feature) {


    const start = this.placesService.userLocation!

    const end = place.properties.coordinates as [number, number]


    this.mapsService.getRouteBetweenPoints(start, end)



  }







}
