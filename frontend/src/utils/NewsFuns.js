export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const postDate = new Date(dateString);
  const timeDiff = now - postDate;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    return hours === 0 ? `${minutes}m ago` : `${hours}hours ago`;
  } else {
    return days === 1 ? "Yesterday" : `${days}days ago`;
  }
};