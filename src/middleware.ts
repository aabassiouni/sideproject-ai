import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
  publicRoutes: ["/", "/signin", "/api/webhook/stripe", "/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/dashboard", "/dashboard/(.*)"],
};

