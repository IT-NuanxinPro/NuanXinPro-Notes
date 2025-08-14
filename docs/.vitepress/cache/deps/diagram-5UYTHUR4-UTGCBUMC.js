import {
  populateCommonDb
} from "./chunk-ZEVIOVXN.js";
import {
  parse
} from "./chunk-AZMKTSIQ.js";
import "./chunk-KH6FDV2Z.js";
import "./chunk-OUJ7EOZL.js";
import "./chunk-Q7UVJCTL.js";
import "./chunk-KPEK7QKZ.js";
import "./chunk-43XIZL32.js";
import "./chunk-A74IW6JM.js";
import "./chunk-GRAH7SS4.js";
import "./chunk-WRHXTWHW.js";
import "./chunk-46Y37KHS.js";
import {
  selectSvgElement
} from "./chunk-Z6KETRIK.js";
import {
  cleanAndMerge
} from "./chunk-6KFYGVLI.js";
import "./chunk-U5Z4XV6B.js";
import {
  __name,
  clear,
  configureSvgSize,
  defaultConfig_default,
  getAccDescription,
  getAccTitle,
  getConfig,
  getDiagramTitle,
  log,
  setAccDescription,
  setAccTitle,
  setDiagramTitle
} from "./chunk-JQDTGBVQ.js";
import "./chunk-SVROXNIC.js";
import "./chunk-5WV6JA3U.js";
import "./chunk-FDBJFBLO.js";

// node_modules/.pnpm/mermaid@11.9.0/node_modules/mermaid/dist/chunks/mermaid.core/diagram-5UYTHUR4.mjs
var defaultPacketData = {
  packet: []
};
var data = structuredClone(defaultPacketData);
var DEFAULT_PACKET_CONFIG = defaultConfig_default.packet;
var getConfig2 = __name(() => {
  const config = cleanAndMerge({
    ...DEFAULT_PACKET_CONFIG,
    ...getConfig().packet
  });
  if (config.showBits) {
    config.paddingY += 10;
  }
  return config;
}, "getConfig");
var getPacket = __name(() => data.packet, "getPacket");
var pushWord = __name((word) => {
  if (word.length > 0) {
    data.packet.push(word);
  }
}, "pushWord");
var clear2 = __name(() => {
  clear();
  data = structuredClone(defaultPacketData);
}, "clear");
var db = {
  pushWord,
  getPacket,
  getConfig: getConfig2,
  clear: clear2,
  setAccTitle,
  getAccTitle,
  setDiagramTitle,
  getDiagramTitle,
  getAccDescription,
  setAccDescription
};
var maxPacketSize = 1e4;
var populate = __name((ast) => {
  populateCommonDb(ast, db);
  let lastBit = -1;
  let word = [];
  let row = 1;
  const { bitsPerRow } = db.getConfig();
  for (let { start, end, bits, label } of ast.blocks) {
    if (start !== void 0 && end !== void 0 && end < start) {
      throw new Error(`Packet block ${start} - ${end} is invalid. End must be greater than start.`);
    }
    start ?? (start = lastBit + 1);
    if (start !== lastBit + 1) {
      throw new Error(
        `Packet block ${start} - ${end ?? start} is not contiguous. It should start from ${lastBit + 1}.`
      );
    }
    if (bits === 0) {
      throw new Error(`Packet block ${start} is invalid. Cannot have a zero bit field.`);
    }
    end ?? (end = start + (bits ?? 1) - 1);
    bits ?? (bits = end - start + 1);
    lastBit = end;
    log.debug(`Packet block ${start} - ${lastBit} with label ${label}`);
    while (word.length <= bitsPerRow + 1 && db.getPacket().length < maxPacketSize) {
      const [block, nextBlock] = getNextFittingBlock({ start, end, bits, label }, row, bitsPerRow);
      word.push(block);
      if (block.end + 1 === row * bitsPerRow) {
        db.pushWord(word);
        word = [];
        row++;
      }
      if (!nextBlock) {
        break;
      }
      ({ start, end, bits, label } = nextBlock);
    }
  }
  db.pushWord(word);
}, "populate");
var getNextFittingBlock = __name((block, row, bitsPerRow) => {
  if (block.start === void 0) {
    throw new Error("start should have been set during first phase");
  }
  if (block.end === void 0) {
    throw new Error("end should have been set during first phase");
  }
  if (block.start > block.end) {
    throw new Error(`Block start ${block.start} is greater than block end ${block.end}.`);
  }
  if (block.end + 1 <= row * bitsPerRow) {
    return [block, void 0];
  }
  const rowEnd = row * bitsPerRow - 1;
  const rowStart = row * bitsPerRow;
  return [
    {
      start: block.start,
      end: rowEnd,
      label: block.label,
      bits: rowEnd - block.start
    },
    {
      start: rowStart,
      end: block.end,
      label: block.label,
      bits: block.end - rowStart
    }
  ];
}, "getNextFittingBlock");
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("packet", input);
    log.debug(ast);
    populate(ast);
  }, "parse")
};
var draw = __name((_text, id, _version, diagram2) => {
  const db2 = diagram2.db;
  const config = db2.getConfig();
  const { rowHeight, paddingY, bitWidth, bitsPerRow } = config;
  const words = db2.getPacket();
  const title = db2.getDiagramTitle();
  const totalRowHeight = rowHeight + paddingY;
  const svgHeight = totalRowHeight * (words.length + 1) - (title ? 0 : rowHeight);
  const svgWidth = bitWidth * bitsPerRow + 2;
  const svg = selectSvgElement(id);
  svg.attr("viewbox", `0 0 ${svgWidth} ${svgHeight}`);
  configureSvgSize(svg, svgHeight, svgWidth, config.useMaxWidth);
  for (const [word, packet] of words.entries()) {
    drawWord(svg, packet, word, config);
  }
  svg.append("text").text(title).attr("x", svgWidth / 2).attr("y", svgHeight - totalRowHeight / 2).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("class", "packetTitle");
}, "draw");
var drawWord = __name((svg, word, rowNumber, { rowHeight, paddingX, paddingY, bitWidth, bitsPerRow, showBits }) => {
  const group = svg.append("g");
  const wordY = rowNumber * (rowHeight + paddingY) + paddingY;
  for (const block of word) {
    const blockX = block.start % bitsPerRow * bitWidth + 1;
    const width = (block.end - block.start + 1) * bitWidth - paddingX;
    group.append("rect").attr("x", blockX).attr("y", wordY).attr("width", width).attr("height", rowHeight).attr("class", "packetBlock");
    group.append("text").attr("x", blockX + width / 2).attr("y", wordY + rowHeight / 2).attr("class", "packetLabel").attr("dominant-baseline", "middle").attr("text-anchor", "middle").text(block.label);
    if (!showBits) {
      continue;
    }
    const isSingleBlock = block.end === block.start;
    const bitNumberY = wordY - 2;
    group.append("text").attr("x", blockX + (isSingleBlock ? width / 2 : 0)).attr("y", bitNumberY).attr("class", "packetByte start").attr("dominant-baseline", "auto").attr("text-anchor", isSingleBlock ? "middle" : "start").text(block.start);
    if (!isSingleBlock) {
      group.append("text").attr("x", blockX + width).attr("y", bitNumberY).attr("class", "packetByte end").attr("dominant-baseline", "auto").attr("text-anchor", "end").text(block.end);
    }
  }
}, "drawWord");
var renderer = { draw };
var defaultPacketStyleOptions = {
  byteFontSize: "10px",
  startByteColor: "black",
  endByteColor: "black",
  labelColor: "black",
  labelFontSize: "12px",
  titleColor: "black",
  titleFontSize: "14px",
  blockStrokeColor: "black",
  blockStrokeWidth: "1",
  blockFillColor: "#efefef"
};
var styles = __name(({ packet } = {}) => {
  const options = cleanAndMerge(defaultPacketStyleOptions, packet);
  return `
	.packetByte {
		font-size: ${options.byteFontSize};
	}
	.packetByte.start {
		fill: ${options.startByteColor};
	}
	.packetByte.end {
		fill: ${options.endByteColor};
	}
	.packetLabel {
		fill: ${options.labelColor};
		font-size: ${options.labelFontSize};
	}
	.packetTitle {
		fill: ${options.titleColor};
		font-size: ${options.titleFontSize};
	}
	.packetBlock {
		stroke: ${options.blockStrokeColor};
		stroke-width: ${options.blockStrokeWidth};
		fill: ${options.blockFillColor};
	}
	`;
}, "styles");
var diagram = {
  parser,
  db,
  renderer,
  styles
};
export {
  diagram
};
//# sourceMappingURL=diagram-5UYTHUR4-UTGCBUMC.js.map
