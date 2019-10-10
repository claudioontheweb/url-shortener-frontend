import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  public shortenUrl(url: string): Observable<string> {
    let header = new HttpHeaders();
    header.append("Content-Type", "application/json");

    let data = {
      originalUrl: url
    };

    return this.http.post<string>("/", data, { headers: header });
  }
}
