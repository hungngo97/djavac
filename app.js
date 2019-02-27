const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
var cmd=require('node-cmd');

const fileOptions = {
  describe: 'Filename',
  demand: true,
  alias: 'f'
};

const exportOptions = {
  describe: 'Export to Java file',
  demand: false,
  alias: 'export',
  default: true
};

const argv = yargs
  .command('djavac', 'Run program', {
    file: fileOptions,
    export: exportOptions
  })
  .help()
  .argv;
var command = argv._[0];
if (command === 'djavac') {
  let filename = argv.file;
  let name = filename.split(".")[0];
  console.log(filename);

  const splitLibraryCode = (data) => {
    var indexOfImportKeyword = data.indexOf("import");
    var indexOfSemicolon = 0;
    var result = "";
    while (indexOfImportKeyword !== -1){
      indexOfSemicolon = data.indexOf(";", indexOfImportKeyword);
      var statement = data.substring(indexOfImportKeyword, indexOfSemicolon + 1);
      result += statement + "\n";
      indexOfImportKeyword = data.indexOf("import", indexOfSemicolon + 1);
    }
    return [result, data.substring(indexOfSemicolon)];
  }

  const writeJavaFile = (name) => new Promise((resolve, reject) => {
    var stream = fs.createWriteStream(name + ".java");
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) console.log(err);
      console.log(data);
      let parts = splitLibraryCode(data);
      let imports = parts[0];
      let body = parts[1];
      stream.write(imports);
      stream.write("public class " + name + `{
          public static void main(String[] args){      
        `);
      stream.write(body);
      stream.write("}");
      stream.write("}");
      stream.end();
    });
    stream.on("finish", resolve);
  });

  const deleteFile = (file) => {
    fs.unlink(file, (err) => {
      if (err) throw err;
    });
  }

  const deleteJavaFile = (name) => {
    console.log('Deleting .java.....');
    deleteFile(name + '.java');
    console.log('Deleting .class....');
    deleteFile(name + '.class');
  }

  const compileJava = async (name) => {
    await writeJavaFile(name);
    cmd.get(
      'javac ' + name + '.java' ,
      function(err,data,stderr){
        cmd.get(
          'java ' + name,
          function(err, data, stderr){
              if (err) console.log(err);
              console.log('Output: ', data );
              //Delete file after using
              if (argv.export === 'false'){
                deleteJavaFile(name);
              }
          }
        )
      }
    );
  }
  compileJava(name);
  console.log('Run completed.');
} else {
  console.log('Command not recognized');
}
