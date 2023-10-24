//
// Copyright 2022 DXOS.org
//

import type { Theme } from "@ch-ui/types";
import { ComponentFunction } from "@ch-ui/types";

import { mx } from "../../util";

export type ToolbarStyleProps = Partial<{}>;

export const toolbarRoot: ComponentFunction<ToolbarStyleProps> = (
  _props,
  ...etc
) => {
  return mx("flex items-center gap-2 is-full", ...etc);
};

export const toolbarTheme: Theme<ToolbarStyleProps> = {
  root: toolbarRoot,
};
