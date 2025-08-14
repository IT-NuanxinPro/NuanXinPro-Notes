import {
  AbstractMermaidTokenBuilder,
  AbstractMermaidValueConverter,
  ArchitectureGeneratedModule,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject,
  lib_exports
} from "./chunk-WRHXTWHW.js";

// node_modules/.pnpm/@mermaid-js+parser@0.6.2/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-JEIROHC2.mjs
var _a;
var ArchitectureTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["architecture"]);
  }
}, __name(_a, "ArchitectureTokenBuilder"), _a);
var _a2;
var ArchitectureValueConverter = (_a2 = class extends AbstractMermaidValueConverter {
  runCustomConverter(rule, input, _cstNode) {
    if (rule.name === "ARCH_ICON") {
      return input.replace(/[()]/g, "").trim();
    } else if (rule.name === "ARCH_TEXT_ICON") {
      return input.replace(/["()]/g, "");
    } else if (rule.name === "ARCH_TITLE") {
      return input.replace(/[[\]]/g, "").trim();
    }
    return void 0;
  }
}, __name(_a2, "ArchitectureValueConverter"), _a2);
var ArchitectureModule = {
  parser: {
    TokenBuilder: __name(() => new ArchitectureTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new ArchitectureValueConverter(), "ValueConverter")
  }
};
function createArchitectureServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Architecture = inject(
    createDefaultCoreModule({ shared }),
    ArchitectureGeneratedModule,
    ArchitectureModule
  );
  shared.ServiceRegistry.register(Architecture);
  return { shared, Architecture };
}
__name(createArchitectureServices, "createArchitectureServices");

export {
  ArchitectureModule,
  createArchitectureServices
};
//# sourceMappingURL=chunk-GRAH7SS4.js.map
