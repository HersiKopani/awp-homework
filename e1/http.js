// E1 (Lecture 1): parse a raw HTTP response
// raw = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{...}"

export function parseResponse(raw) {
  // TODO 1: split head and body at the first "\r\n\r\n"
  // TODO 2: status line -> version, status (a number), statusText
  // TODO 3: headers -> object with lower-case names, trimmed values
  //         (split each line at the FIRST ":" only)
  // TODO 4: JSON.parse the body when content-type is application/json
  // return { version, status, statusText, headers, body };
}

export function category(status) {
  // TODO: "Informational" | "Success" | "Redirection"
  //       | "Client error" | "Server error"
}
