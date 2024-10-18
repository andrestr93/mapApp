import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapsService } from '../../services';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  private placeService = inject(PlacesService)
  private mapsService = inject(MapsService)


  @ViewChild('mapDiv') mapDivElement!: ElementRef


  ngAfterViewInit(): void {


    if (!this.placeService.userLocation) throw Error('No hay localizacion en el mapa')



    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 14,
    });

    const popup = new Popup()
      .setHTML(`

      <h6>Aqui estoy</h6>
      <span>Estoy en este lugar del mundo</span>
      
      `)

    new Marker({ color: 'red' })
      .setLngLat(this.placeService.userLocation)
      .setPopup(popup)
      .addTo(map)


    this.mapsService.setMap(map)



  }
}
