export function calculateInterval(date) {
  let interval;
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const postDate = new Date(date);
  const today = new Date();

  const result = Math.floor((today - postDate) / _MS_PER_DAY);

  switch (true) {
    case result == 0:
      interval = "Today";
      break;

    case result <= 7:
      interval = "This week";
      break;

    case result <= 14:
      interval = "Last week";
      break;
    case result <= 30:
      interval = "This month";
      break;
    case result <= 60:
      interval = "2 months ago";
      break;
    case result <= 90:
      interval = "3 months ago";
      break;
    case result <= 365:
      interval = "This year";
      break;
    default:
      interval = "A while ago";
  }
  return interval;
}
