// Retrieve the video progress data from local storage
chrome.storage.local.get("videos", (result) => {
  let videos = result.videos || {};

  // Get all link elements with the class "edittllect"
  let aElements = document.querySelectorAll("a.edittllect");

  // Loop through the NodeList of link elements and append the video progress data to each link
  aElements.forEach((aElement) => {
    let url = aElement.href;
    let videoData = videos[url];
    if (videoData) {
      // Format the video progress data as a time string
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

      // Append the video progress data to the link element's text content
      let progressString =
        videoData.progress >= 100 ? "✅" : `⏸️ (${timeString})`;
      aElement.innerText = `${progressString} ${aElement.innerText}`;
    }
  });
});
