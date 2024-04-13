import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <LandingNavbar />
      {children}
      <Footer />
    </div>
  );
}

export default LandingLayout;
