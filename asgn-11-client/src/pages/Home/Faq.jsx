


import Lottie from "lottie-react";
import faqAnimation from "../../assets/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqData = [
    {
      question: "Account Creation",
      answer:
        "Begin by creating your account using either your email address or Google authentication. This step ensures that you have access to all the features and benefits FlavorFusion has to offer.",
    },
    {
      question: "Explore Our Menu",
      answer:
        "Once you have successfully created your account, dive into the diverse array of food categories available at FlavorFusion. From appetizers to desserts, explore and discover the flavors that tantalize your taste buds.",
    },
    {
      question: "Add Dishes to Your Favorites",
      answer:
        "After selecting your preferred dishes, start curating your favorites by adding them to your collection. Whether it is a delectable dish or a refreshing beverage, add them to your favorites for future enjoyment.",
    },
    {
      question: "Order and Enjoy",
      answer:
        "Finally, indulge in the ultimate dining experience by ordering your favorite dishes from your curated collection. Sit back, relax, and savor every mouthful as you immerse yourself in the culinary delights offered by FlavorFusion.",
    },
  ];

  return (
    <section className=" bg-zinc-50/50">
      <div className="container px-4 py-16 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center text-zinc-800">
          How To Get Started?
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-zinc-800" />
        </h1>

        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
          {/* FAQ Animation with enhanced styling */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/50 to-transparent rounded-2xl -z-10" />
            <Lottie
              animationData={faqAnimation}
              className="h-[400px] w-full object-contain"
            />
          </div>

          {/* FAQ Accordion with shadcn styling */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="px-4 py-2 mb-4 transition-all duration-300 border rounded-lg shadow-sm border-zinc-200 hover:shadow-md"
                >
                  <AccordionTrigger className="text-lg font-semibold text-zinc-800 hover:text-zinc-600 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 text-zinc-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;