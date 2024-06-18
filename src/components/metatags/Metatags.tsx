import React from "react";
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  name?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = "",
  description = "",
  image = "https://uploads-ssl.webflow.com/6599546377b008b56ba05d55/65aa787f3d4561896a57c8d8_Webimage%202.png",
  name = "Bonadocs",
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <link rel="canonical" href={window.location.href} />
      <meta name="description" content={description} />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="314" />
      {/* Open Graph tags (OG) */}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* OG image tags */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:alt" content={`Image of ${title} site`} />
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
