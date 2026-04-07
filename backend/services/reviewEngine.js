


// services/reviewEngine.js
export function calculatePoints(reviewText, keywords, hasMedia) {
  const words = reviewText ? reviewText.trim().split(/\s+/).length : 0;
  const wordPoints = Math.min(words, 100);

  const keywordMatches = keywords.filter(k =>
    reviewText.toLowerCase().includes(k.toLowerCase())
  ).length;
  const keywordPoints = keywordMatches * 10;

  const mediaPoints = hasMedia ? 50 : 0;

  return wordPoints + keywordPoints + mediaPoints;
}

export function suggestKeywords(reviewText, orderHistory = []) {
  if (!orderHistory || !Array.isArray(orderHistory)) return [];
  const suggestions = [];
  orderHistory.forEach(item => {
    if (!reviewText.toLowerCase().includes(item.toLowerCase())) {
      suggestions.push(item);
    }
  });
  return suggestions.slice(0, 5);
}
