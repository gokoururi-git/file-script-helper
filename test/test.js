const {main} = require('../core');

main((inputContent, inputArgs) => {
  console.log(`source content is:\n${inputContent}\n=======\nsource inputArgs is ${JSON.stringify(inputArgs)}`);
  return {
    outputContent: inputContent + '\nwe appended it here',
    outputFilename: 'testOutput.txt'
  }
});

