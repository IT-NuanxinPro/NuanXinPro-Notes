import {
  __name,
  getConfig2
} from "./chunk-JQDTGBVQ.js";

// node_modules/.pnpm/mermaid@11.9.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-UWXLY5YG.mjs
var solidStateFill = __name((color) => {
  const { handDrawnSeed } = getConfig2();
  return {
    fill: color,
    hachureAngle: 120,
    // angle of hachure,
    hachureGap: 4,
    fillWeight: 2,
    roughness: 0.7,
    stroke: color,
    seed: handDrawnSeed
  };
}, "solidStateFill");
var compileStyles = __name((node) => {
  const stylesMap = styles2Map([...node.cssCompiledStyles || [], ...node.cssStyles || []]);
  return { stylesMap, stylesArray: [...stylesMap] };
}, "compileStyles");
var styles2Map = __name((styles) => {
  const styleMap = /* @__PURE__ */ new Map();
  styles.forEach((style) => {
    const [key, value] = style.split(":");
    styleMap.set(key.trim(), value == null ? void 0 : value.trim());
  });
  return styleMap;
}, "styles2Map");
var isLabelStyle = __name((key) => {
  return key === "color" || key === "font-size" || key === "font-family" || key === "font-weight" || key === "font-style" || key === "text-decoration" || key === "text-align" || key === "text-transform" || key === "line-height" || key === "letter-spacing" || key === "word-spacing" || key === "text-shadow" || key === "text-overflow" || key === "white-space" || key === "word-wrap" || key === "word-break" || key === "overflow-wrap" || key === "hyphens";
}, "isLabelStyle");
var styles2String = __name((node) => {
  const { stylesArray } = compileStyles(node);
  const labelStyles = [];
  const nodeStyles = [];
  const borderStyles = [];
  const backgroundStyles = [];
  stylesArray.forEach((style) => {
    const key = style[0];
    if (isLabelStyle(key)) {
      labelStyles.push(style.join(":") + " !important");
    } else {
      nodeStyles.push(style.join(":") + " !important");
      if (key.includes("stroke")) {
        borderStyles.push(style.join(":") + " !important");
      }
      if (key === "fill") {
        backgroundStyles.push(style.join(":") + " !important");
      }
    }
  });
  return {
    labelStyles: labelStyles.join(";"),
    nodeStyles: nodeStyles.join(";"),
    stylesArray,
    borderStyles,
    backgroundStyles
  };
}, "styles2String");
var userNodeOverrides = __name((node, options) => {
  var _a;
  const { themeVariables, handDrawnSeed } = getConfig2();
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const result = Object.assign(
    {
      roughness: 0.7,
      fill: stylesMap.get("fill") || mainBkg,
      fillStyle: "hachure",
      // solid fill
      fillWeight: 4,
      hachureGap: 5.2,
      stroke: stylesMap.get("stroke") || nodeBorder,
      seed: handDrawnSeed,
      strokeWidth: ((_a = stylesMap.get("stroke-width")) == null ? void 0 : _a.replace("px", "")) || 1.3,
      fillLineDash: [0, 0]
    },
    options
  );
  return result;
}, "userNodeOverrides");

export {
  solidStateFill,
  compileStyles,
  isLabelStyle,
  styles2String,
  userNodeOverrides
};
//# sourceMappingURL=chunk-PDZIPQ2Q.js.map
