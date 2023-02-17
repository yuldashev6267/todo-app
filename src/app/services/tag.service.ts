import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private url: string = "http://localhost:7700"

  constructor(private http:HttpClient) {
  }

  addTag(tag:string) {
    return this.http.post(`${this.url}/api/create/tag`, {tag:tag}, {})
  }
}
