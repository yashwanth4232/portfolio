export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yashwanth Kumar",
    jobTitle: "AI & ML Student",
    url: "http://localhost:3000",
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfolio",
    url: "http://localhost:3000",
  };
}