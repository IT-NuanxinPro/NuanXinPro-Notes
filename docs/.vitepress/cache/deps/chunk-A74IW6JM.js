import {
  AbstractMermaidTokenBuilder,
  AbstractMermaidValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  PieGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject,
  lib_exports
} from "./chunk-WRHXTWHW.js";

// node_modules/.pnpm/@mermaid-js+parser@0.6.2/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-WFWHJNB7.mjs
var _a;
var PieTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["pie", "showData"]);
  }
}, __name(_a, "PieTokenBuilder"), _a);
var _a2;
var PieValueConverter = (_a2 = class extends AbstractMermaidValueConverter {
  runCustomConverter(rule, input, _cstNode) {
    if (rule.name !== "PIE_SECTION_LABEL") {
      return void 0;
    }
    return input.replace(/"/g, "").trim();
  }
}, __name(_a2, "PieValueConverter"), _a2);
var PieModule = {
  parser: {
    TokenBuilder: __name(() => new PieTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new PieValueConverter(), "ValueConverter")
  }
};
function createPieServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Pie = inject(
    createDefaultCoreModule({ shared }),
    PieGeneratedModule,
    PieModule
  );
  shared.ServiceRegistry.register(Pie);
  return { shared, Pie };
}
__name(createPieServices, "createPieServices");

export {
  PieModule,
  createPieServices
};
//# sourceMappingURL=chunk-A74IW6JM.js.map
