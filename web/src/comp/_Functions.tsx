export function arrShuffle(array:any[]):any[] {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export function fDownload(data:string, filename:string, type:string="") {
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}
export function fOpen(extension:string="",callback:(this: HTMLInputElement, ev: Event) => any){
  var input = document.createElement("input")
  input.setAttribute("id","file-input");
  input.setAttribute("type","file");
  input.setAttribute("name","name");
  input.setAttribute("style","display:none;");
  input.setAttribute("accept",extension);
  input.click()
  input.addEventListener("change",callback)
}
export const yyyymmdd = (date:Date) => date.toISOString().slice(0,10).replace(/-/g,"")
;

// export function strigfy(x:any):string{
//   if(x instanceof Object){
//     if(typeof x=="string") return "\""+x+"\""
//     else if(Array.isArray(x)){
//       let out="["
//       for(let value of x){
//         out+= strigfy(value)+","
//       }
//       out+="]\n"
//       return out
//     }
//     else{
//     let out="{\n"
//     for(const [key,value] of Object.entries(x)){
//       out+= key + ":" +strigfy(value)+",\n"
//     }
//     out+="}"
//     return out
//     }
//   } else {
//     return JSON.stringify(x)
//   }
// }
