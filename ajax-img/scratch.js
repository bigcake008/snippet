function sendRequest() {
  const httpRequest = new XMLHttpRequest();
  // making cross-origin XMLRequest is PRE-FLIGHT request
  // you need a response header with Access-Control-Allow-Origin: *
  httpRequest.open("GET", "https://cdn.beekka.com/blogimg/asset/202306/bg2023061302.webp");
  httpRequest.send();
  httpRequest.responseType = "arraybuffer";
  // older way to request binary data without messing
  // httpRequest.overrideMimeType("text/plain; charset=x-user-defined");
  httpRequest.onreadystatechange = async () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      // respond is received
      if (httpRequest.status === 200) {
        // everything is OK
        console.log("OK");
        let binary = "";
        const utf8Arr = new Uint8Array(httpRequest.response);
        console.log("length:" + utf8Arr.length);
        for (let i=0; i < utf8Arr.length; i++) {
          binary += String.fromCodePoint(utf8Arr[i]);
        }

        // let responseText = httpRequest.responseText;
        // let responseTextLen = responseText.length;
        // console.log("length:" + responseText.length);
        // // convert utf-16 to other format which can deal with btoa
        // for (let i = 0; i < responseTextLen; i++ ) {
        //   binary += String.fromCharCode(responseText.charCodeAt(i) & 255)
        // }
        const data = btoa(binary);
        const img = document.querySelector("img");
        // "data:image/png;base64,"
        img.setAttribute("src", 'data:image/webp;base64,' + data);
      } else {
        // something go wrong
        console.log("not Ok");
      }
    } else {
      // not yet
      console.log("still processing");
    }
  }

}


async function createObjectUrl() {
  const response = await fetch("https://cdn.beekka.com/blogimg/asset/202306/bg2023061302.webp")
  const imgUrl = URL.createObjectURL(await response.blob());
  console.log(imgUrl);
  const img = document.querySelector("img");
  img.setAttribute("src", imgUrl);
}

async function readAsDataUrl() {
  const response = await fetch("https://cdn.beekka.com/blogimg/asset/202306/bg2023061302.webp");
  const fr = new FileReader();
  const img = document.querySelector("img");
  fr.readAsDataURL(await response.blob());
  fr.addEventListener("load", () => {
    console.log(fr.result);
    img.setAttribute("src", fr.result);
  })
}


const btn = document.querySelector("button");
btn.onclick = readAsDataUrl;