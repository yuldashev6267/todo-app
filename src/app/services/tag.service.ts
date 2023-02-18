import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tag} from "../models/tag"

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private url: string = "http://localhost:7700"

  constructor(private http:HttpClient) {
  }

  addTag(tag:string):Observable<tag> {
    return this.http.post<tag>(`${this.url}/api/create/tag`, {tag:tag}, {})
  }
}
