## Console-In-Dom
``` bash
npm install console-in-dom --save
```
[live-preview](https://reysun.github.io/console-in-dom/) here

### how to use
#### es2015
``` javascript
import { ConsoleInDom } from 'console-in-dom';
let Console = ConsoleInDom.render(); //default render to document.body
Console.log(1);
console.log(1);
/*
let Console = ConsoleInDom.render(
  document.getElementById('output-console')
);
Console.log(1);
console.log(1);
*/
```

#### commonJS
``` javascript
let Console = require('console-in-dom').render();
/*
let Console = require('console-in-dom').render(
  document.getElementById('output-console')
);
Console.log(1);
console.log(1);
*/
```

#### unpkg
[https://unpkg.com/console-in-dom@1.0.1/console.min.js](https://unpkg.com/console-in-dom@1.0.1/console.min.js)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://unpkg.com/console-in-dom@1.0.1/console.css">
  <title>console-in-dom</title>
</head>
<body>
  <div id="console_output"></div>
  <script src="https://unpkg.com/console-in-dom@1.0.1/console.min.js"></script>
  <script>
    var Console = ConsoleInDom.render();
    Console.log(1);
    console.log(1);
  </script>
</body>
</html>
```