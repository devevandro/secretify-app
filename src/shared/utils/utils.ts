import { icons } from "shared/constants/icons";
import { author as _author, name } from "~/package.json";

const author = _author.name ?? _author;
const authorInKebabCase = author.replace(/\s+/g, "-");
const appId = `com.${authorInKebabCase}.${name}`.toLowerCase();

/**
 * @param {string} id
 * @description Create the app id using the name and author from package.json transformed to kebab case if the id is not provided.
 * @default 'com.{author}.{app}' - the author and app comes from package.json
 * @example
 * makeAppId('com.example.app')
 * // => 'com.example.app'
 */
export function makeAppId(id: string = appId): string {
  return id;
}

export const setIconUrl = (url: string): string | undefined => {
  const iconUrl = icons.find((icon) => {
    if (url.toUpperCase().includes(icon.name.toUpperCase()))
      return icon.iconUrl;
  });

  return iconUrl?.iconUrl;
};

export const verifyPassword = (password: string): string => {
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);
  const passwordLength = password.length;

  const requisitos = [hasCapitalLetter, hasNumber, hasSymbol].filter(
    Boolean
  ).length;

  if (passwordLength > 8 && requisitos === 3) {
    return "forte";
  }

  if (passwordLength > 6 && requisitos >= 2) {
    return "média";
  }

  return "fraca";
};
