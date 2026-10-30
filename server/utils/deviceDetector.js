const { UAParser } = require("ua-parser-js");

/**
 * Parses incoming Express request to extract rich client device, browser, OS, and network details.
 * @param {import('express').Request} req
 */
function parseClientDevice(req) {
  const userAgent = req?.headers?.["user-agent"] || "";
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  // Extract real client IP
  let rawIp =
    req?.headers?.["x-forwarded-for"]?.split(",")?.[0]?.trim() ||
    req?.headers?.["x-real-ip"] ||
    req?.socket?.remoteAddress ||
    req?.ip ||
    "127.0.0.1";

  // Clean IPv6 prefix
  const cleanIp = rawIp.replace(/^::ffff:/, "");

  const browserName = result.browser?.name || "Unknown Browser";
  const browserVersion = result.browser?.version ? result.browser.version.split(".").slice(0, 2).join(".") : "";
  const fullBrowser = browserVersion ? `${browserName} ${browserVersion}` : browserName;

  const osName = result.os?.name || "Unknown OS";
  const osVersion = result.os?.version || "";
  const fullOs = osVersion ? `${osName} ${osVersion}` : osName;

  let deviceType = "Desktop";
  const rawType = result.device?.type;
  if (rawType === "mobile") deviceType = "Mobile";
  else if (rawType === "tablet") deviceType = "Tablet";
  else if (rawType) deviceType = rawType.charAt(0).toUpperCase() + rawType.slice(1);
  else if (/mobile|iphone|android.*mobile/i.test(userAgent)) deviceType = "Mobile";
  else if (/ipad|tablet|android(?!.*mobile)/i.test(userAgent)) deviceType = "Tablet";

  const deviceVendor = result.device?.vendor || "";
  const deviceModel = result.device?.model || "";
  const fullDevice = [deviceVendor, deviceModel].filter(Boolean).join(" ") || deviceType;

  return {
    loginAt: new Date(),
    ip: cleanIp,
    device: deviceType,
    deviceModel: fullDevice,
    os: fullOs,
    osName,
    osVersion,
    browser: fullBrowser,
    browserName,
    browserVersion,
    userAgent: userAgent.substring(0, 500),
  };
}

module.exports = { parseClientDevice };
