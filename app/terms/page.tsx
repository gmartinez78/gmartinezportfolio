import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms and Conditions | Andrea Giraldo",
  description: "Privacy Policy and Terms and Conditions for Andrea Giraldo.",
  robots: {
    index: false,
    follow: false,
  },
};

const privacySections = [
  {
    title: "1. Who we are",
    content: (
      <>
        <p>
          This website is operated by Andrea Giraldo, an independent insurance advisor serving individuals and families in Florida, USA. For any privacy question or request, contact:
        </p>
        <ul>
          <li>Email: <a href="mailto:andrea7giraldo@gmail.com">andrea7giraldo@gmail.com</a></li>
          <li>Phone: <a href="tel:+18027777463">+1 (802) 777-7463</a></li>
          <li>Business address: 8473 W Linebaugh Ave, Suite 106, Tampa, FL 33625</li>
        </ul>
        <p>We are the party responsible for the personal information you share through this website, our Facebook page, and our ads. We collect your data, not Meta.</p>
      </>
    ),
  },
  {
    title: "2. What information we collect",
    content: <ul>
      <li><strong>Information you give us:</strong> name, email, phone number, ZIP code, age or date of birth, household size, and any details you share when you request a quote, ask about a plan, or fill out a form or lead ad.</li>
      <li><strong>Insurance-related details:</strong> the coverage you are interested in (health insurance, Medicare, Marketplace / ACA plans, family or individual coverage). We only collect what is needed to advise you.</li>
      <li><strong>Information collected automatically:</strong> device and browser type, IP address, pages visited, and similar analytics data through cookies and tracking technologies.</li>
      <li><strong>Information from Facebook / Meta:</strong> when you respond to a lead ad or message us, we receive the contact details and answers you submit through that form.</li>
    </ul>,
  },
  {
    title: "3. How we use your information",
    content: <ul>
      <li>To respond to your request and give you insurance guidance</li>
      <li>To compare and explain plan options suited to your situation</li>
      <li>To help you enroll and to provide support after enrollment</li>
      <li>To contact you by phone, email, text, or messaging about your inquiry</li>
      <li>To improve our website and our ads</li>
      <li>To meet legal, regulatory, and insurance-industry requirements</li>
      <li>We do not sell your personal information.</li>
    </ul>,
  },
  { title: "4. How we share your information", content: <><p>We only share your information when necessary:</p><ul><li><strong>Insurance carriers and government marketplaces</strong> (for example healthcare.gov) to request quotes or process an application you asked for</li><li><strong>Service providers</strong> that help us run the website, forms, or communications, under confidentiality obligations</li><li><strong>Legal authorities</strong> when required by law</li></ul></> },
  { title: "5. Cookies and tracking technologies", content: <p>This website may use cookies and tools such as the Facebook pixel to understand traffic and measure ad performance. Facebook and other third parties may use these technologies to collect data about your activity on this site and elsewhere. You can control cookies through your browser settings.</p> },
  { title: "6. Your rights and choices", content: <><p>You can ask us to:</p><ul><li>Access the personal information we hold about you</li><li>Correct or update it</li><li>Delete it</li><li>Stop contacting you or opt out of marketing messages</li></ul><p>To exercise any of these, contact us at <a href="mailto:andrea7giraldo@gmail.com">andrea7giraldo@gmail.com</a>. California residents have additional rights under the CCPA, including the right to know and to opt out of the sale of personal information (we do not sell it).</p></> },
  { title: "7. Data retention and security", content: <p>We keep your information only as long as needed to serve you and to meet legal and industry obligations, then delete it securely. We use reasonable safeguards to protect it, though no method of transmission over the internet is fully secure.</p> },
  { title: "8. Children's privacy", content: <p>This website is not directed at children under 13, and we do not knowingly collect their information. Details about minors are only collected as part of a parent&apos;s or guardian&apos;s family coverage request.</p> },
  { title: "9. Changes to this policy", content: <p>We may update this policy. The effective date at the top shows the last revision. Continued use of the site means you accept the current version.</p> },
  { title: "10. Contact", content: <p>Questions or requests about your data: <a href="mailto:andrea7giraldo@gmail.com">andrea7giraldo@gmail.com</a> | <a href="tel:+18027777463">+1 (802) 777-7463</a></p> },
];

const termsSections = [
  ["1. Acceptance", "By using this website, you agree to these Terms. If you do not agree, please do not use the site."],
  ["2. What this website is", "This website provides general information about insurance products and lets you contact Andrea Giraldo, an independent insurance advisor, for guidance. Andrea helps you understand and compare plans and does not underwrite or issue insurance."],
  ["3. Not professional or legal advice", "Information on this site is general and educational. It is not a policy, a guarantee of coverage, or a substitute for reading the official terms of any plan. Coverage, eligibility, and pricing are set by the insurance carriers and government marketplaces, and are subject to their approval."],
  ["4. No guarantee of results", "We aim for accurate, current information but do not guarantee that plan details, prices, or availability shown here are complete or up to date. Final terms always come from the carrier or marketplace."],
  ["5. Your responsibilities", "You agree to give accurate information and to use the site lawfully. You are responsible for the decisions you make based on the guidance provided."],
  ["6. Intellectual property", "The content, branding, and design of this website belong to Andrea Giraldo and may not be copied or reused without permission."],
  ["7. Third-party links", "This site may link to carriers, marketplaces, or Facebook. We are not responsible for the content or privacy practices of those third parties."],
  ["8. Limitation of liability", "To the extent permitted by law, Andrea Giraldo is not liable for damages arising from your use of this website or reliance on its general information."],
  ["9. Governing law", "These Terms are governed by the laws of the State of Florida, USA."],
  ["10. Changes", "We may update these Terms at any time. The effective date at the top reflects the latest version."],
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] px-6 py-12 text-[#243b53] sm:py-20">
      <article className="mx-auto max-w-3xl rounded-[28px] border border-[#cfe5f8] bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-14">
        <header className="border-b border-[#cfe5f8] pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1183d0]">Andrea Giraldo</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#0e2951] sm:text-5xl">Privacy Policy &amp; Terms and Conditions</h1>
          <p className="mt-4 text-sm text-[#5c7792]">Effective date: July 27, 2026</p>
        </header>

        <section className="mt-10">
          <h2 className="font-serif text-3xl font-semibold text-[#0e2951]">Privacy Policy</h2>
          {privacySections.map((section) => (
            <section key={section.title} className="mt-7 text-[15px] leading-7 text-[#3c3e3f] [&_a]:text-[#1183d0] [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
              <h3 className="mb-2 text-lg font-semibold text-[#0e2951]">{section.title}</h3>
              {section.content}
            </section>
          ))}
        </section>

        <section className="mt-12 border-t border-[#cfe5f8] pt-10">
          <h2 className="font-serif text-3xl font-semibold text-[#0e2951]">Terms and Conditions</h2>
          {termsSections.map(([title, content]) => (
            <section key={title} className="mt-7 text-[15px] leading-7 text-[#3c3e3f]">
              <h3 className="mb-2 text-lg font-semibold text-[#0e2951]">{title}</h3>
              <p>{content}</p>
            </section>
          ))}
          <section className="mt-7 text-[15px] leading-7 text-[#3c3e3f]">
            <h3 className="mb-2 text-lg font-semibold text-[#0e2951]">11. Contact</h3>
            <p><a className="text-[#1183d0] underline underline-offset-2" href="mailto:andrea7giraldo@gmail.com">andrea7giraldo@gmail.com</a> | <a className="text-[#1183d0] underline underline-offset-2" href="tel:+18027777463">+1 (802) 777-7463</a></p>
          </section>
        </section>
      </article>
    </main>
  );
}
