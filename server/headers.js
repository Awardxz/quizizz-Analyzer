const myHeaders = new Headers();
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0");
myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Language", "en-US,en;q=0.5");
myHeaders.append("Accept-Encoding", "gzip, deflate, br, zstd");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Credentials", "include");
myHeaders.append("x-q-traceid", "Root=1-66866af7-6a23ebde15e15b52e1c3af38;Parent=a36931c11833398e;Sampled=1");
myHeaders.append("X-Amzn-Trace-Id", "Root=1-66866af7-6a23ebde15e15b52e1c3af38;Parent=a36931c11833398e;Sampled=1");
myHeaders.append("x-quizizz-uid", "53988cb6-d3ea-467b-b873-b0ed75db4438");
myHeaders.append("x-csrf-token", "iZi4qLjT-xKRrw3YSMjN-hRFumzJ7xWqB3-8");
myHeaders.append("experiment-name", "main_main");
myHeaders.append("Origin", "https://quizizz.com");
myHeaders.append("DNT", "1");
myHeaders.append("Sec-GPC", "1");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Referer", "https://quizizz.com/");
myHeaders.append("Cookie", "suid=8f220839-e8b3-4556-8d0d-19e6400bce70; _ga_NYFWYHHSPY=GS1.1.1720085238.1.0.1720085238.60.0.0; _ga=GA1.1.2005138535.1720085238");
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "same-site");
myHeaders.append("TE", "trailers");

const myHeaders1 = new Headers();
myHeaders1.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0");
myHeaders1.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");
myHeaders1.append("Accept-Language", "en-US,en;q=0.5");
myHeaders1.append("Accept-Encoding", "gzip, deflate, br, zstd");
myHeaders1.append("Connection", "keep-alive");
myHeaders1.append("Cookie", "quizizz_uid=80dc885e-7449-4e49-89fd-cd26f230389f; QUIZIZZ_EXP_SLOT=22; QUIZIZZ_EXP_NAME=main_main; QUIZIZZ_EXP_LEVEL=live; QUIZIZZ_EXP_VERSION=v2; g_state={i_p:1720639883519,i_l:3}; __zlcmid=1KYmX68J30H1cEu; qnps_date_checked=1710477960181; qnps_was_prompted=false; qnps_pending=false; locale=en; crowdinLangCode=en; definiteCountry=AL; _sid=nWnW9yD5-kZ9IOTS68I1cXB3X1ZPQqd52l46kRorEMsuArGdWpLGepnSM36kCzOAdlt0RsiWa0hhnUXjCeWA7WVE2yljL8ii.BEHDM3Z3LF4aQj9xnPwJmQ.LqBT-77uAjfrYLTR; _csrf=W5gslamELUvi6P4FCB5GNgPO; x-csrf-token=wgponxf6-WdI5NrP_C4x1phtPRvgSlTA-CT8; suid=371b3beb-515c-4135-bc92-9eaafebe38a3");
myHeaders1.append("Upgrade-Insecure-Requests", "1");
myHeaders1.append("Sec-Fetch-Dest", "document");
myHeaders1.append("Sec-Fetch-Mode", "navigate");
myHeaders1.append("Sec-Fetch-Site", "none");
myHeaders1.append("Sec-Fetch-User", "?1");
myHeaders1.append("If-None-Match", "W/2afb-/kcSRxOhFVTXxP0hk3YpQusc7PU");
myHeaders1.append("Priority", "u=1");
myHeaders1.append("TE", "trailers");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://quizizz.com/_api/main/game/66866b3d35e3355cc9e5a397", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
exports.myHeaders = myHeaders