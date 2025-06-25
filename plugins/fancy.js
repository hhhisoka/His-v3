/**
 * ✨ FANCY TEXT PLUGIN
 * Generate fancy text styles
 */

export default {
  name: "fancy",
  description: "Generate fancy text styles",
  category: "fun",
  commands: ["fancy", "style"],

  async execute(sock, message, from, body) {
    const isCommand = this.commands.some(
      (cmd) => body.toLowerCase().startsWith(`.${cmd}`) || body.toLowerCase().startsWith(`!${cmd}`),
    )

    if (!isCommand) return

    const text = body.split(" ").slice(1).join(" ")

    if (!text) {
      await sock.sendMessage(from, {
        text: "✨ *HISOKA FANCY TEXT*\n\nUsage: .fancy <text>\nExample: .fancy Hello World",
      })
      return
    }

    const fancyStyles = [
      { name: "Bold", text: this.toBold(text) },
      { name: "Italic", text: this.toItalic(text) },
      { name: "Monospace", text: this.toMonospace(text) },
      { name: "Strikethrough", text: this.toStrikethrough(text) },
      { name: "Underline", text: this.toUnderline(text) },
      { name: "Bubble", text: this.toBubble(text) },
      { name: "Square", text: this.toSquare(text) },
      { name: "Flip", text: this.toFlip(text) },
    ]

    let response = "✨ *HISOKA FANCY TEXT GENERATOR* ✨\n\n"
    fancyStyles.forEach((style, index) => {
      response += `${index + 1}. *${style.name}:*\n${style.text}\n\n`
    })

    await sock.sendMessage(from, { text: response })
  },

  toBold(text) {
    const bold = {
      a: "𝗮",
      b: "𝗯",
      c: "𝗰",
      d: "𝗱",
      e: "𝗲",
      f: "𝗳",
      g: "𝗴",
      h: "𝗵",
      i: "𝗶",
      j: "𝗷",
      k: "𝗸",
      l: "𝗹",
      m: "𝗺",
      n: "𝗻",
      o: "𝗼",
      p: "𝗽",
      q: "𝗾",
      r: "𝗿",
      s: "𝘀",
      t: "𝘁",
      u: "𝘂",
      v: "𝘃",
      w: "𝘄",
      x: "𝘅",
      y: "𝘆",
      z: "𝘇",
      A: "𝗔",
      B: "𝗕",
      C: "𝗖",
      D: "𝗗",
      E: "𝗘",
      F: "𝗙",
      G: "𝗚",
      H: "𝗛",
      I: "𝗜",
      J: "𝗝",
      K: "𝗞",
      L: "𝗟",
      M: "𝗠",
      N: "𝗡",
      O: "𝗢",
      P: "𝗣",
      Q: "𝗤",
      R: "𝗥",
      S: "𝗦",
      T: "𝗧",
      U: "𝗨",
      V: "𝗩",
      W: "𝗪",
      X: "𝗫",
      Y: "𝗬",
      Z: "𝗭",
    }
    return text
      .split("")
      .map((char) => bold[char] || char)
      .join("")
  },

  toItalic(text) {
    const italic = {
      a: "𝘢",
      b: "𝘣",
      c: "𝘤",
      d: "𝘥",
      e: "𝘦",
      f: "𝘧",
      g: "𝘨",
      h: "𝘩",
      i: "𝘪",
      j: "𝘫",
      k: "𝘬",
      l: "𝘭",
      m: "𝘮",
      n: "𝘯",
      o: "𝘰",
      p: "𝘱",
      q: "𝘲",
      r: "𝘳",
      s: "𝘴",
      t: "𝘵",
      u: "𝘶",
      v: "𝘷",
      w: "𝘸",
      x: "𝘹",
      y: "𝘺",
      z: "𝘻",
      A: "𝘈",
      B: "𝘉",
      C: "𝘊",
      D: "𝘋",
      E: "𝘌",
      F: "𝘍",
      G: "𝘎",
      H: "𝘏",
      I: "𝘐",
      J: "𝘑",
      K: "𝘒",
      L: "𝘓",
      M: "𝘔",
      N: "𝘕",
      O: "𝘖",
      P: "𝘗",
      Q: "𝘘",
      R: "𝘙",
      S: "𝘚",
      T: "𝘛",
      U: "𝘜",
      V: "𝘝",
      W: "𝘞",
      X: "𝘟",
      Y: "𝘠",
      Z: "𝘡",
    }
    return text
      .split("")
      .map((char) => italic[char] || char)
      .join("")
  },

  toMonospace(text) {
    return `\`\`\`${text}\`\`\``
  },

  toStrikethrough(text) {
    return `~${text}~`
  },

  toUnderline(text) {
    return text
      .split("")
      .map((char) => char + "\u0332")
      .join("")
  },

  toBubble(text) {
    const bubble = {
      a: "ⓐ",
      b: "ⓑ",
      c: "ⓒ",
      d: "ⓓ",
      e: "ⓔ",
      f: "ⓕ",
      g: "ⓖ",
      h: "ⓗ",
      i: "ⓘ",
      j: "ⓙ",
      k: "ⓚ",
      l: "ⓛ",
      m: "ⓜ",
      n: "ⓝ",
      o: "ⓞ",
      p: "ⓟ",
      q: "ⓠ",
      r: "ⓡ",
      s: "ⓢ",
      t: "ⓣ",
      u: "ⓤ",
      v: "ⓥ",
      w: "ⓦ",
      x: "ⓧ",
      y: "ⓨ",
      z: "ⓩ",
      A: "Ⓐ",
      B: "Ⓑ",
      C: "Ⓒ",
      D: "Ⓓ",
      E: "Ⓔ",
      F: "Ⓕ",
      G: "Ⓖ",
      H: "Ⓗ",
      I: "Ⓘ",
      J: "Ⓙ",
      K: "Ⓚ",
      L: "Ⓛ",
      M: "Ⓜ",
      N: "Ⓝ",
      O: "Ⓞ",
      P: "Ⓟ",
      Q: "Ⓠ",
      R: "Ⓡ",
      S: "Ⓢ",
      T: "Ⓣ",
      U: "Ⓤ",
      V: "Ⓥ",
      W: "Ⓦ",
      X: "Ⓧ",
      Y: "Ⓨ",
      Z: "Ⓩ",
    }
    return text
      .split("")
      .map((char) => bubble[char] || char)
      .join("")
  },

  toSquare(text) {
    const square = {
      a: "🅰",
      b: "🅱",
      c: "🅲",
      d: "🅳",
      e: "🅴",
      f: "🅵",
      g: "🅶",
      h: "🅷",
      i: "🅸",
      j: "🅹",
      k: "🅺",
      l: "🅻",
      m: "🅼",
      n: "🅽",
      o: "🅾",
      p: "🅿",
      q: "🆀",
      r: "🆁",
      s: "🆂",
      t: "🆃",
      u: "🆄",
      v: "🆅",
      w: "🆆",
      x: "🆇",
      y: "🆈",
      z: "🆉",
    }
    return text
      .toLowerCase()
      .split("")
      .map((char) => square[char] || char)
      .join("")
  },

  toFlip(text) {
    const flip = {
      a: "ɐ",
      b: "q",
      c: "ɔ",
      d: "p",
      e: "ǝ",
      f: "ɟ",
      g: "ƃ",
      h: "ɥ",
      i: "ᴉ",
      j: "ɾ",
      k: "ʞ",
      l: "l",
      m: "ɯ",
      n: "u",
      o: "o",
      p: "d",
      q: "b",
      r: "ɹ",
      s: "s",
      t: "ʇ",
      u: "n",
      v: "ʌ",
      w: "ʍ",
      x: "x",
      y: "ʎ",
      z: "z",
    }
    return text
      .toLowerCase()
      .split("")
      .map((char) => flip[char] || char)
      .reverse()
      .join("")
  },
}
