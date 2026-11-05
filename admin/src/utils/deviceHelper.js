/**
 * Device & Session Telemetry formatting helpers
 */

export function formatDateTime(dateString) {
  if (!dateString) return { date: "Never", time: "No record", full: "Never logged in", relative: "Never" };

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return { date: "Invalid", time: "Invalid", full: "Invalid date", relative: "Invalid" };
  }

  // Exact localized date
  const dateStr = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Exact localized 12-hour time with seconds
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Relative time calculation
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHour / 24);

  let relative = "Just now";
  if (diffDays > 30) {
    relative = dateStr;
  } else if (diffDays > 0) {
    relative = `${diffDays}d ago`;
  } else if (diffHour > 0) {
    relative = `${diffHour}h ago`;
  } else if (diffMin > 0) {
    relative = `${diffMin}m ago`;
  } else if (diffSec > 10) {
    relative = `${diffSec}s ago`;
  }

  return {
    date: dateStr,
    time: timeStr,
    full: `${dateStr} at ${timeStr}`,
    relative,
  };
}

export function getDeviceCategory(deviceType = "") {
  const dt = (deviceType || "").toLowerCase();
  if (dt.includes("mobile") || dt.includes("phone")) return "Mobile";
  if (dt.includes("tablet") || dt.includes("ipad")) return "Tablet";
  return "Desktop";
}
