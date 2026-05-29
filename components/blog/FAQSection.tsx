import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { faqSchema, jsonLdScriptProps } from "@/lib/schema";

export function FAQSection({
  items,
  heading = "Frequently asked",
}: {
  items: FAQItem[];
  heading?: string;
}) {
  if (!items.length) return null;
  return (
    <>
      <script {...jsonLdScriptProps(faqSchema(items))} />
      <FAQ items={items} heading={heading} eyebrow="FAQ" />
    </>
  );
}

export type { FAQItem };
