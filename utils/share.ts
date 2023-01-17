// function that constructs a twitter share link from a given string
export const twitterShareLink = (text: string) => {
  // text should be url encoded
  const encodedText = encodeURIComponent(text);
  const url = `https://twitter.com/intent/tweet?text=${encodedText}`;
  return url;
}

// function that constructs a reddit share link from a given string
export const redditShareLink = (url: string, title: string) => {
  // title should be url encoded
  const redditUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
  return redditUrl;
}
