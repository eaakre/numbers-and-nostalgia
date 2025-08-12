import { ReactNode, ReactElement } from "react";

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (isReactElement(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

// Type guard for ReactElement
function isReactElement(
  node: ReactNode
): node is ReactElement<{ children?: ReactNode }> {
  return (
    typeof node === "object" &&
    node !== null &&
    "props" in node &&
    "type" in node
  );
}
