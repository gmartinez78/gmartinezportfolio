import type { Metadata } from "next";
import { AndreaTermsContent } from "../terms/page";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms and Conditions | Andrea Giraldo",
  description: "Privacy Policy and Terms and Conditions for Andrea Giraldo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AndreaTermsPage() {
  return <AndreaTermsContent />;
}
