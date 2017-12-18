import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PrismModule } from '../prism/prism.module';
import 'prismjs/components/prism-typescript';

@NgModule({
  imports:      [ BrowserModule, PrismModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  exports: [AppComponent]
})
export class AppModule {
}
