// Get the video element and current page URL
let video = document.querySelector("video");
let url = window.location.href;

// Add a timeupdate event listener to the video element
video.addEventListener("timeupdate", () => {
  // Get the current time and duration of the video
  let currentTime = video.currentTime;
  let duration = video.duration;

  // Calculate the percentage of the video that has been watched
  let progress = (currentTime / duration) * 100;

  // Create a new object with the URL as the key and the video progress as the value
  let data = {};
  data[url] = { progress: progress, currentTime: currentTime };

  // Retrieve the current videos object from local storage and merge it with the new data object
  chrome.storage.local.get("videos", (result) => {
    let videos = result.videos || {}; // If there is no videos object in local storage, create an empty object
    videos = Object.assign(videos, data); // Merge the new data object with the existing videos object

    // Save the updated videos object back to local storage
    chrome.storage.local.set({ videos: videos }, () => {
      // Log a message to the console to confirm that the data was saved
      console.log(`Saved video progress for ${url}: ${progress}%`);
    });
  });
});

// Add a loadedmetadata event listener to the video element
video.addEventListener("loadedmetadata", () => {
  // Retrieve the videos object from local storage
  chrome.storage.local.get("videos", (result) => {
    let videos = result.videos || {};

    // Get the saved progress data for the current URL
    let videoData = videos[url];
    if (videoData) {
      // Set the current time of the video to the saved value
      video.currentTime = videoData.currentTime;
    }
  });
});
