export const PRODUCT_PER_PAGE = 6;
// export const DOMAIN = "http://localhost:3000";
// export const DOMAIN = "https://agri-guard-solutions-p2h8.vercel.app";
const PRODUCTION_DOMAIN = "https://agri-guard-solutions-p2h8.vercel.app";
const DEVELOPMENT_DOMAIN = "http://localhost:3000";
export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
