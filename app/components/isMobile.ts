import { UAParser } from "ua-parser-js";

export function isMobileCheck(): boolean {
    if (typeof window === "undefined") return false;
    const parser = new UAParser();
    const result = parser.getResult();
    return (
        result.device.type === "mobile" ||
        result.device.type === "xr" ||
        result.device.type === "tablet" ||
        result.device.type === "embedded" ||
        result.device.type === "console" ||
        result.device.type === "smarttv" ||
        result.device.type === "wearable"
    );
}
