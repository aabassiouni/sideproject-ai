import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/dashboard", "/dashboard/(.*)"],
};
