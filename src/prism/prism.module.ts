import { NgModule } from '@angular/core';
import { PrismComponent } from './prism.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [HttpClientModule],
    exports: [PrismComponent],
    declarations: [PrismComponent],
    providers: [],
})
export class PrismModule { }
