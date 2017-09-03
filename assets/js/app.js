import "phoenix_html"
import {Socket} from "phoenix"

let socket = new Socket("/socket", {
  logger: (kind, msg, data) => {
    console.log(`${kind}: ${msg}`, data)
  }
})
socket.connect()

let fileChannel = socket.channel("file_watch")
window.file = fileChannel

let treeContainer = document.getElementById("tree")
let fileContainer = document.getElementById("file")

let updateFile = ({path, content}) => {
  console.log("update_file", path)
  if(path !== fileChannel.params.activePath){ return }
  console.log("replacing active content", content)

  fileContainer.value = `#${path}\n\n${content}`
}


treeContainer.addEventListener("click", event => {
  event.preventDefault()
  let path = event.target.attributes["data-path"].value
  let files = document.querySelectorAll("#tree .active")
  for(let index = 0; index < files.length; index++){
    files[index].classList.remove("active")
  }
  event.target.parentElement.classList.add("active")
  fileChannel.params.activePath = path
  fileChannel.push("get_file", {path: path})
             .receive("ok", updateFile)
})

let updateTree = ({tree}) => {
  console.log("update_tree", tree)

  treeContainer.innerHTML = tree.map(path => {
    return `
      <li role="presentation">
        <a href="#" data-path="${path}">${path}</a>
      </li>
    `
  }).join("")
}

fileChannel.on("update_tree", updateTree)
fileChannel.on("update_file", updateFile)

fileChannel.join().receive("ok", updateTree)

let resizeFilePane = () => {
  let height = Math.floor(document.documentElement.clientHeight * 0.94)
  fileContainer.style.height = `${height}px`
}

resizeFilePane()
window.onresize = resizeFilePane