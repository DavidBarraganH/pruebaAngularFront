import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../models/cliente.model';



@Injectable()
export class AccessBankService {

    public url: string;

    constructor (
        public _http: HttpClient
    ){
        this.url = "https://testbankapi.firebaseio.com/clients.json";
    }

    getClientes():Observable <Cliente[]>{
        return this._http.get<Cliente[]>(this.url);
    }


    addUser(client): Observable <any> {
        let params = JSON.stringify(client);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url, params, {headers : headers})
    }
}