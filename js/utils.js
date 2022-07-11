import messages from "./messages.js";
import BladeErrors from "./errors.js";

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const translate = (msg) => {
  return messages[msg] ?? console.error(BladeErrors.no_translate);
};

// function toDataURL(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       callback(reader.result);
//     }
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }

// toDataURL('../img/test.png', function(dataUrl) {
//   console.log('RESULT:', dataUrl)
// })
