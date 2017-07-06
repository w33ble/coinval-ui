function s3() {
  return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
}

export default function create() {
  return `${s3()}${s3()}`;
}
