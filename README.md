# file script helper

a slight library for processing what a JS function can do to reflect source text file to expect text file.

## example

```
// test/a.txt
this is a.
```

```js
// test/test.js
const {main} = require('../core');

main((inputContent, inputArgs) => {
  console.log(`source content is:\n${inputContent}\n=======\nsource inputArgs is ${JSON.stringify(inputArgs)}`);
  return {
    outputContent: inputContent + '\nwe appended it here',
    outputFilename: 'testOutput.txt'
  }
});
```

```shell
node ./test/test.js ./test/a.txt
```

**output**

```shell
$ node ./test/test.js ./test/a.txt
source content is:
this is a.
=======
source inputArgs is ["D:\\programs\\Node\\node.exe","D:\\projects\\file-script-helper\\test\\test.js","./test/a.txt"]
```

```
// test/testOutput.txt
this is a.
we appended it here
```

## what's the big deal of it?

you can focus on your logic to how to deal with source text and transform it to be expected, in detail, you will get user-inputted stringified file content and some other necessary message then you just need to return the content of new file, then it will save file to user's disk.

## beginning?

it so easy to get it, also, we have two cases in the rep, you can learn form it.

## what I need?

just node!