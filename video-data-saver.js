let video = document.querySelector("video");
let url = window.location.href;

video.addEventListener("timeupdate", () => {
  let currentTime = video.currentTime;
  let duration = video.duration;

  let progress = (currentTime / duration) * 100;

  let data = {};
  data[url] = { progress: progress, currentTime: currentTime };

  chrome.storage.local.get("videos", (result) => {
    let videos = result.videos || {};
    videos = Object.assign(videos, data);

    chrome.storage.local.set({ videos: videos }, () => {
      console.log(`Saved video progress for ${url}: ${progress}%`);
    });
  });
});

video.addEventListener("loadedmetadata", () => {
  chrome.storage.local.get("videos", (result) => {
    let videos = result.videos || {};

    let videoData = videos[url];
    if (videoData) {
      video.currentTime = videoData.currentTime;
    }
  });
});
