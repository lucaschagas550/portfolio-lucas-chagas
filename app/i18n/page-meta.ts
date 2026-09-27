import type { PageId } from "~/data/pages";
import { getLocale } from "~/i18n/locale";
import { messages } from "~/i18n/messages";

export function pageMeta(pathname: string, pageId: PageId | "notFound") {
  const { title, description } = messages[getLocale(pathname)][pageId].meta;

  return [{ title }, { name: "description", content: description }];
}
