import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
  publicRoutes: [ "/signin","/opengraph-image","/twitter-image", "/api/webhook/stripe", "/api/webhook/clerk"],
  ignoredRoutes: ["/"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/dashboard", "/dashboard/(.*)"],
};

