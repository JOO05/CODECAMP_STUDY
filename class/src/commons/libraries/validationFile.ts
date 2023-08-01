export const checkValidationFile = (file?: File) : boolean => {
  if (typeof file === "undefined") {
    alert("파일이 없습니다!.")
    return false;}
  
  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 너무 큽니다. 제한은 5MB 입니다.")
    return false;}
    
  if(!file.type.includes("jpeg") && !file.type.includes("png")){
    alert("jpeg 또는 png 파일만 업로드하세요.")
    return false;}
  return true;
}