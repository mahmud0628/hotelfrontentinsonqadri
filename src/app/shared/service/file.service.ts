import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // API url
  api = environment.baseUrl + "/api/admin/tashkilot";

  constructor(private http: HttpClient) { }

  // Returns an observable
   singleFileUpload(id: number, file: File): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);


    return this.http.post(this.api + "/upload/" + id, formData);
  }

  public downloadFile(id: number) {
    return this.http.get(this.api + "/download/" + id, { responseType: "blob" });
  }
}
