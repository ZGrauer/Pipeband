// CloudFront Function (JavaScript runtime 2.0), attached to the distribution's default
// behavior as the viewer request function. Not part of the Angular build.
//
// scripts/write-page-shells.js writes a page shell per public page, such as hire/index.html.
// S3 has no object named "hire", so this sends /hire and /hire/ to /hire/index.html.
// Paths with a file extension (assets, scripts) and / are left alone. A path with no shell,
// such as /members/music, then misses in S3 and falls back to /index.html through the
// distribution's existing error response, the same as before this function.

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);

  if (uri !== '/' && lastSegment.indexOf('.') === -1) {
    request.uri = uri.replace(/\/+$/, '') + '/index.html';
  }
  return request;
}
