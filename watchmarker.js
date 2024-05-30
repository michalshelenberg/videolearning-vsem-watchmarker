chrome.storage.local.get("videos", (result) => {
  let videos = result.videos || {};

  let aElements = document.querySelectorAll("a.edittllect");

  aElements.forEach((aElement) => {
    let url = aElement.href;
    let videoData = videos[url];
    if (videoData) {
      let currentTime = videoData.currentTime;
      let hours = parseInt(currentTime / 3600);
      let minutes = parseInt((currentTime % 3600) / 60);
      let seconds = parseInt(currentTime % 60);
      let timeString = "";
      if (hours > 0) {
        timeString += `${hours}:`;
      }
      if (minutes > 0 || hours > 0) {
        timeString += `${minutes.toString().padStart(2, "0")}:`;
      }
      timeString += `${seconds.toString().padStart(2, "0")}`;

      let progressString =
        videoData.progress >= 100 ? "✅" : `⏸️ (${timeString})`;
      aElement.innerText = `${progressString} ${aElement.innerText}`;
    }
  });
});
