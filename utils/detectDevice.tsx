"use server";

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export const isMobileDevice = async () => {
  if (typeof process === "undefined") {
    throw new Error(
      "[Server method] You are importing a server-only module outside of the server"
    );
  }

  const headersList = await headers(); // ✅ Await the headers() Promise
  const ua = headersList.get("user-agent") || "";

  const parser = new UAParser(ua);
  const device = parser.getDevice();

  return device.type === "mobile";
};