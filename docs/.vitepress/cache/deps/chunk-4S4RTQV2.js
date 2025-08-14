import {
  insertEdge,
  insertEdgeLabel,
  markers_default,
  positionEdgeLabel
} from "./chunk-LRSZ5T3U.js";
import {
  insertCluster,
  insertNode,
  labelHelper
} from "./chunk-XI4QZ6IA.js";
import {
  interpolateToCurve
} from "./chunk-6KFYGVLI.js";
import {
  __name,
  common_default,
  getConfig,
  log
} from "./chunk-JQDTGBVQ.js";

// node_modules/.pnpm/mermaid@11.9.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-IWUHOULB.mjs
var internalHelpers = {
  common: common_default,
  getConfig,
  insertCluster,
  insertEdge,
  insertEdgeLabel,
  insertMarkers: markers_default,
  insertNode,
  interpolateToCurve,
  labelHelper,
  log,
  positionEdgeLabel
};
var layoutAlgorithms = {};
var registerLayoutLoaders = __name((loaders) => {
  for (const loader of loaders) {
    layoutAlgorithms[loader.name] = loader;
  }
}, "registerLayoutLoaders");
var registerDefaultLayoutLoaders = __name(() => {
  registerLayoutLoaders([
    {
      name: "dagre",
      loader: __name(async () => await import("./dagre-JOIXM2OF-6QRMCT3S.js"), "loader")
    }
  ]);
}, "registerDefaultLayoutLoaders");
registerDefaultLayoutLoaders();
var render = __name(async (data4Layout, svg) => {
  if (!(data4Layout.layoutAlgorithm in layoutAlgorithms)) {
    throw new Error(`Unknown layout algorithm: ${data4Layout.layoutAlgorithm}`);
  }
  const layoutDefinition = layoutAlgorithms[data4Layout.layoutAlgorithm];
  const layoutRenderer = await layoutDefinition.loader();
  return layoutRenderer.render(data4Layout, svg, internalHelpers, {
    algorithm: layoutDefinition.algorithm
  });
}, "render");
var getRegisteredLayoutAlgorithm = __name((algorithm = "", { fallback = "dagre" } = {}) => {
  if (algorithm in layoutAlgorithms) {
    return algorithm;
  }
  if (fallback in layoutAlgorithms) {
    log.warn(`Layout algorithm ${algorithm} is not registered. Using ${fallback} as fallback.`);
    return fallback;
  }
  throw new Error(`Both layout algorithms ${algorithm} and ${fallback} are not registered.`);
}, "getRegisteredLayoutAlgorithm");

export {
  registerLayoutLoaders,
  render,
  getRegisteredLayoutAlgorithm
};
//# sourceMappingURL=chunk-4S4RTQV2.js.map
