import md5 from "md5";

export function hashCode(str) {
  let newString = str + new Date().toString();
  return  md5(newString);
}
