import { Component, Input, OnInit, ElementRef, AfterViewInit ,ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'prism',
    templateUrl: 'prism.component.html'
})
export class PrismComponent implements OnInit {
    @Input() content: string;
    @Input() language: string;
    @Input() src: string;
    formattedContent: string;
    constructor(private http:HttpClient) {
        
    }

    ngOnInit() {
        if (this.content != null) {
            this.formattedContent = Prism.highlight(this.content, Prism.languages[this.language]);
        }

        if (this.src != null) {
            this.http.get(this.src).subscribe((t:string) => {
                this.formattedContent = Prism.highlight(t, Prism.languages[this.language]);
            }, (error: HttpErrorResponse)=> {
                if (error.status == 200) {
                    this.formattedContent = Prism.highlight(error.error.text, Prism.languages[this.language]);
                }
                
            });
        }
    }
    
}
