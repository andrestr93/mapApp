import { Component, inject } from '@angular/core';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-mylocation',
  templateUrl: './btn-mylocation.component.html',
  styleUrl: './btn-mylocation.component.css'
})
export class BtnMylocationComponent {

  private mapService = inject(MapsService)
  private placesService = inject(PlacesService)


  gotToMyLocation() {

    if (!this.placesService.userLocation) throw Error('no hay ubicacion de usuario')
    if (!this.mapService.isMapReady) throw Error('No hay mapa disponible')


    this.mapService.flyTo(this.placesService.userLocation!)



  }

}
