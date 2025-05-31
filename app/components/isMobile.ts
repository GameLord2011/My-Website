import { UAParser } from "ua-parser-js";

export function isMobileCheck(): boolean {
  if (typeof window === "undefined") return false;
  const parser = new UAParser();
  const result = parser.getResult();
  const teslaRegex = /(Tesla|QtCarBrowser|QtCarWebEngine)/i;
  const isTesla = teslaRegex.test(window.navigator.userAgent);
  const isSmallScreen = window.innerWidth < 768;
  return (
    isSmallScreen ||
    isTesla ||
    result.device.type === "mobile" ||
    result.device.type === "xr" ||
    result.device.type === "tablet" ||
    result.device.type === "embedded" ||
    result.device.type === "console" ||
    result.device.type === "smarttv" ||
    result.device.type === "wearable"
  );
}
