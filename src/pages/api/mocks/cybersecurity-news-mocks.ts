export const mockCyberArticles = [
  {
    title: "Global Cybersecurity Framework Updated to Combat Rising Threats",
    description: "The international standards body has released new cybersecurity guidelines for critical infrastructure protection against evolving digital threats.",
    url: "https://example.com/cybersecurity-framework-update",
    urlToImage: "/placeholder-cyber.png",
  },
  {
    title: "Hackers Exploit IoT Devices in Unprecedented DDoS Attack",
    description: "Security researchers report a massive botnet attack leveraging vulnerable smart devices, reaching 2.5 Tbps in traffic volume.",
    url: "https://example.com/iot-ddos-attack",
    urlToImage: "/placeholder-hack.png",
  },
  {
    title: "Phishing Scams Target Corporate Email Accounts with AI-Generated Voices",
    description: "New Business Email Compromise attacks use deepfake audio to impersonate executives, with losses exceeding $50M this quarter.",
    url: "https://example.com/ai-phishing-scam",
    urlToImage: "/placeholder-phishing.png",
  }
].map(article => ({
  title: article.title,
  description: article.description,
  url: article.url,
  urlToImage: article.urlToImage,
}));