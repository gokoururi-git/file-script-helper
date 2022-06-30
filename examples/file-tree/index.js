const { main } = require("../../core");

/**
 *
 * @param {*} currentRoot
 * @param {number} currentDepth
 * @param {boolean[]} controlMap
 * @returns
 */
function dealInput(currentRoot, currentDepth, controlMap) {
  if (!currentRoot || typeof currentRoot !== "object") {
    return [];
  }
  const res = [];
  if (currentDepth === 1) {
    res.push("└── root");
  }
  Object.keys(currentRoot).forEach((key, index, array) => {
    const preSpace = controlMap.map((item) => (item ? "    " : "│   "));
    res.push(
      `${preSpace.join("")}${index === array.length - 1 ? "└" : "├"}── ${key}`
    );
    const ctrl = [...controlMap, index === array.length - 1];
    res.push(
      ...dealInput(
        currentRoot[key],
        currentDepth + 1,
        ctrl
      )
    );
  });
  return res;
}

main((inputContent) => {
  if (inputContent.includes("[") || inputContent.includes("]")) {
    console.log(
      `grammar error: '[', ']' should not appear in source JSON file, it only accepts '{' or '}'`
    );
    process.exit(1);
  }
  const input = JSON.parse(inputContent);
  return {
    outputContent: dealInput(input, 1, [true]).join("\n"),
  };
});
