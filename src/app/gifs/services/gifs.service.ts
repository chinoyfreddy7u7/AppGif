import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif} from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //creamos la propiedad privada de la API
//lo que esta dentro de nuestro '' es el codigo de la Api 
  private apiKey: string='4CEgyCl3zTp9YKaofdo89VAv1A1BL14y'

  private servicioUrl: string='https://api.giphy.com/v1/gifs'
 //creamos propiedad privada 

 private _historial :string[]=[]

 public resultados: Gif[]=[]
 
 get historial(){

  return [...this._historial];
 }
 


 constructor (private http: HttpClient){
 if (localStorage.getItem('historial')) {
  this._historial = JSON.parse(localStorage.getItem('historial')!)
  
 }
 if (localStorage.getItem('resultados')) {
  this.resultados=JSON.parse(localStorage.getItem('resultados')!)
  
 }

 }

 buscarGifs(query: string=''){
//limita el dashboard a asemejar como iguales las frases y/o palabras escritas en mayuscula y posteriormente 
//minusculas
  query= query.trim().toLocaleLowerCase()
   //con el includes evitamos que se repita mas de 1 vez la palabra ingresada.
 if(!this._historial.includes(query))

 this._historial.unshift(query)


 this._historial= this._historial.splice(0,10)
 
  //JSON STRINGIFY CONVIERTE CUALQUIER COSA A STRING, THIS._HISTORIAL AL SER UN ARREGLO NO ERA RECONOCIDO
 //PERO CON .STRINGIFY ESO CAMBIA C:

 localStorage.setItem('historial',JSON.stringify(this._historial))
 
 

 const params= new HttpParams().set('apiKey' ,this.apiKey).
                                set('limit','10').
                                set('q', query);
              console.log(params.toString())


           //URL DE NUESTRA API                        
              

 this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((resp:any)=> 
    {console.log(resp.data)
      this.resultados=resp.data 
      localStorage.setItem('resultados',JSON.stringify(this.resultados))
    },
   
             )
    
 }



 }
