# ng-prismjs

An angular component for syntax highlighting using primsjs.

## Demo

https://angular-patterns.github.io/ng-prismjs/

## Pre-requisites

* prismjs
* Angular5+

## Installation

Prismjs is a PEER depedency.

npm install prismjs <br />
npm install ng-prismjs

## Setup

### Import the Module

**app.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PrismModule } from 'ng-prismjs';

@NgModule({
  imports:      [ 
    BrowserModule, 
    PrismModule
  ],
  declarations: [ 
    AppComponent 
  ],
  bootstrap:    [ 
    AppComponent 
  ]
})
export class AppModule {
}
```

### Include Prism into your build process

**vendor.ts**

```typescript
import 'prismjs'
```

### Add additional languages (optional)

You can add support for additional languages by importing certain scripts.

For example, to add typescript support, import `prism-typescript.js`.

**app.module.ts**

```typescript
import { PrismModule } from 'ng-prismjs';
import 'prismjs/components/prism-typescript';
```

## Usage

### Create a code Snippet (make sure it is not compiled)

**snippet.html**

```html
<div>
   <b>This is an HTML snippet!</b>
</div>
```

### Load the snippet into a variable

Use `raw-loader` and `require` to read the snippet into a variable.  The `!!` ensures that no other loaders are processing the file.

```typescript
const snippet: string = require('!!raw-loader!./path/to/snippet.html');
```

**app.component.ts**

Bind the snippet to the `prism` component and include a `language` property.

The language must be one of the built-in languages supported by prismjs, or it can be one that you explicitly import.  See the `prismjs\components` for a full list of languages.  The format of a language component is `prism-<language>.js`.

```typescript
import { Component } from '@angular/core';
const snippet: string = require('!!raw-loader!./path/to/snippet.html');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content: string;
  language: string;
  constructor() {
     this.content = snippet;
     this.language = 'html'
  }
}

```

**app.component.html**

```html
<prism [content]="content" [language]="language"></prism>
```

