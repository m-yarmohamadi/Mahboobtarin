export default function getOS() {
  const userAgent =
    window.navigator.userAgent || window.navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  return "desktop";
}
