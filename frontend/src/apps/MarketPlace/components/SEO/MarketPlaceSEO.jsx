import SEOHead from "../../../../components/SEO/SEOHead";

const MarketPlaceSEO = ({
  title,
  description = "A premium digital marketplace offering high quality web templates, software solutions, and specialized digital services.",
  keywords = [],
  image,
  url,
  type = "website",
  ...props
}) => {
  const fullTitle = title
    ? title.toLowerCase().includes("marketplace")
      ? title
      : `${title} | Digital MarketPlace`
    : "Digital MarketPlace | Premium Web Templates & Services";

  const marketplaceKeywords = [
    "digital marketplace",
    "web templates",
    "react templates",
    "software solutions",
    "custom web development",
    "digital products",
    ...keywords,
  ];

  return (
    <SEOHead
      title={fullTitle}
      description={description}
      keywords={marketplaceKeywords}
      image={image || "/images/marketplace-og.jpg"}
      url={url}
      type={type}
      {...props}
    />
  );
};

export default MarketPlaceSEO;
