import { query } from '@angular/animations';
import { Component, ElementRef,  ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

    //inyectamos el servicio en busqueda (ya que ahi lo vamos a usar xd) con una propiedad privada
   constructor( private gifsService: GifsService){}
    
    buscar(termino:string =''){

      
     

      const valor= this.txtBuscar.nativeElement.value;

    //controlamos el historial de busqueda en caso de que el usuario no ingrese nada

    if (valor.trim().length===0) {

      return;
      //Fin control historial de busqueda en caso de ingresar valores nulos.
    }

    

      this.gifsService.buscarGifs( valor )
         
         this.txtBuscar.nativeElement.value=''

       

         

       
    
  }
}



