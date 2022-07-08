import messages from "./messages.json";
import BladeErrors from "./errors.js";

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const translate = (msg) => {
  return messages[msg] ?? console.error(BladeErrors.no_translate);
};
