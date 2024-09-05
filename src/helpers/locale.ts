export const localeTranslation = (locale: string | undefined) => {
  if (locale === "bm") return "ms";
  else if (locale === "vn") return "vi";
  else return locale;
};
