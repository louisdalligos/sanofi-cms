export function baseurl(endpoint) {
  const local = "http://localhost/api/v1/";
  const remote = "";

  return `${local}${endpoint}`;
}
