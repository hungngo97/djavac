<h1 align="center">Welcome to djavac -Dynamic Java Compiler 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/codiaryofficial">
    <img alt="Twitter: codiaryofficial" src="https://img.shields.io/twitter/follow/codiaryofficial.svg?style=social" target="_blank" />
  </a>
</p>

> REPL tool to write Java file without complicated Java class structure

## Install

```sh
npm install
```

## Usage

```sh
            djavac filename.djava

Write simple Java program without complicated class and function syntax

main.djava file sample:

import java.util.*;
import java.lang.*;

System.out.println("Hello world!");
int x = 5 + 7;
System.out.println(x);

To run this file, simply type in the command 
"djavac --file=main.djava --export=true"

Optional export: true if we want to export out .java file and false otherwise


```

## Run tests

```sh
npm run test
```

## Author

👤 **Hung Ngo**

* Twitter: [@codiaryofficial](https://twitter.com/codiaryofficial)
* Github: [@hungngo97](https://github.com/hungngo97)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
>>>>>>> Add readme
