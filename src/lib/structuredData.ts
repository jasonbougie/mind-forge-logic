import { useEffect } from "react";

/**
 * Injects a JSON-LD structured data script into <head> and removes it on unmount.
 */
export const useJsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];
    const items = Array.isArray(data) ? data : [data];

    items.forEach((item) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, []);
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dude Tan",
  "url": "https://dudetan.shop",
  "logo": "https://dudetan.shop/logo.png",
  "description": "The first spray-on sunless tanner made specifically for men.",
  "sameAs": [
    "https://www.instagram.com/dude_tan",
    "https://www.tiktok.com/@thedude.tan",
    "https://twitter.com/thedude_tan"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@dudetan.shop"
  }
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dude Tan",
  "url": "https://dudetan.shop",
  "description": "Spray-on sunless tanner for men. Fix your farmer tan in 60 seconds."
};

export const shopItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Dude Tan Products",
  "description": "Spray-on sunless tanner products for men",
  "url": "https://dudetan.shop/shop"
};

export const buildProductSchema = (product: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.title,
  "description": product.description,
  "image": product.images?.edges?.[0]?.node?.url || "",
  "brand": {
    "@type": "Brand",
    "name": "Dude Tan"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://dudetan.shop/product/${product.handle}`,
    "priceCurrency": product.priceRange?.minVariantPrice?.currencyCode || "USD",
    "price": product.priceRange?.minVariantPrice?.amount || "0",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Dude Tan"
    }
  }
});

export const wholesaleServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Dude Tan Wholesale Program",
  "description": "Wholesale sunless tanner for men available for barbershops, grooming salons, and retail partners. 50% retail margin. 12-unit minimum order.",
  "provider": {
    "@type": "Organization",
    "name": "Dude Tan",
    "url": "https://dudetan.shop"
  },
  "areaServed": "US",
  "serviceType": "Wholesale Distribution"
};

export const wholesaleFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the minimum order for Dude Tan wholesale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Opening orders are 12 units. Once your account is established, reorders drop to 6-unit minimums. Volume pricing is available at 50+ units."
      }
    },
    {
      "@type": "Question",
      "name": "What are the payment terms for Dude Tan wholesale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Opening orders are prepaid. Net 30 terms are available for accounts in good standing after their second order."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly does Dude Tan ship wholesale orders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orders ship within 3 business days. Standard ground shipping is included on orders over $200."
      }
    },
    {
      "@type": "Question",
      "name": "What is the retail margin on Dude Tan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wholesale price is $24.99. Retail price is $49.99. That is a 50% retail margin — $25 profit per unit."
      }
    }
  ]
};
