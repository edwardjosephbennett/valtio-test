"use client";

import { proxy, useSnapshot } from "valtio";

export const valtioState = proxy({
  count: 0,
  name: ""
});
