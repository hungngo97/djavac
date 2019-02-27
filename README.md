# djavac - Dynamic Java Compiler
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


