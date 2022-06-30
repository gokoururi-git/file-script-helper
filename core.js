/** don't run this file directly! or you'll get errors. */
const { readFileSync, writeFileSync, existsSync } = require("fs");
const { resolve, dirname } = require('path');
const args = process.argv;
/**
 * @param {(inputContent: string, inputArgs: string[]) => {outputContent: string; outputFilename?: string}} outputProcessor function for processing of output
 * @param {{fileNotExist?: string, pleaseInputFileName?: string}} tipMaps tips set used for replacing a series of default tips
 */
function main(outputProcessor, tipMaps) {
  const [_nodePath, scriptPath, filepath] = args;
  const pleaseInputFileName = tipMaps?.pleaseInputFileName || `please input target text file.\nexample:\nnode examples/file-tree.js targetFile.json`;
  if(!filepath){
    console.error(pleaseInputFileName);
    return;
  }
  const targetFilepath = getFixedTargetPath(scriptPath, filepath, tipMaps?.fileNotExist);
  const targetFolder = dirname(targetFilepath);
  const { outputContent, outputFilename } = outputProcessor(readFileSync(targetFilepath), args);
  const outputPath = resolve(targetFolder, outputFilename || 'output.txt');
  writeFileSync(outputPath, outputContent);
}

/**
 * @param {string} scriptPath
 * @param {string} filePath
 * @param {string} fileNotExistTip
 * @returns {string} fixed target file path
 */
function getFixedTargetPath(scriptPath, filePath, sourceFileNotExistTip) {
  if(!existsSync(filePath)){
    const rootPath = dirname(scriptPath);
    if(!existsSync(resolve(rootPath, filePath))){
      const fileNotExistTip = sourceFileNotExistTip || `error: the file '${filePath}' or '${resolve(rootPath, filePath)}' do not exist!`;
      console.error(fileNotExistTip);
      process.exit(1);
    }
    return resolve(rootPath, filePath);
  }
  return filePath;
}

module.exports = { main };
