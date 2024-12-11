'use client';

import { motion } from 'framer-motion';
import parse, { DOMNode } from 'html-react-parser';
import { useSiteData } from '@/context/SiteDataContext';

interface FaqItem {
    question: string;
    answer: React.ReactNode;
}

export default function Faq() {
    const data = useSiteData();

    // Ensure the FAQ data exists and provide a fallback to prevent errors
    const faqContent = data?.pagesMap?.['faq']?.content || '';
    const faqTitle = data?.pagesMap?.['faq']?.title || 'FAQ';

    // Extract structured FAQ items
    const faqItems: FaqItem[] = [];
    parse(faqContent, {
        replace: (node: DOMNode) => {
            // Ensure the node is an Element and has the 'name' property
            if ('name' in node && node.name === 'p') {
                // Use proper type checking for the result of find
                const strongElement = 
                    'children' in node &&
                    node.children?.find(
                        (child) => 'name' in child && child.name === 'strong'
                    );
    
                if (strongElement && typeof strongElement !== 'boolean' && 'children' in strongElement) {
                    // Check if the first child is a Text node
                    const textNode = strongElement.children?.[0];
                    const strongText = textNode && 'data' in textNode ? textNode.data : null;
    
                    if (strongText) {
                        // Ensure the parent and its siblings are properly checked
                        const parentNextSibling = strongElement.parent?.next?.next;
    
                        let answer = null;
                        if (parentNextSibling && 'children' in parentNextSibling) {
                            const answerNode = parentNextSibling.children?.[0];
                            answer = answerNode && 'data' in answerNode ? answerNode.data : null;
                        }
    
                        faqItems.push({
                            question: strongText.trim(),
                            answer: answer ? parse(answer) : 'No answer provided.',
                        });
                    }
                }
            }
        },
    });

    const toggleAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Get all .faq-item elements
        const allFaqItems = document.querySelectorAll('.faq-item');
    
        // Get the current .faq-item of the clicked .faq-title
        const currentFaqItem = (e.target as HTMLElement).closest('.faq-item');
    
        if (!currentFaqItem) return;
    
        // Remove 'open' class from all .faq-item elements
        allFaqItems.forEach((faqItem) => {
            if (faqItem !== currentFaqItem) {
                faqItem.classList.remove('open');
            }
        });
    
        // Toggle 'open' class on the current .faq-item
        currentFaqItem.classList.toggle('open');
    };

    const contactVariants = {
        initial: { x: 200 },
        enter: { x: 0 },
        exit: { x: 200 },
    };

    const pageTransition = {
        duration: 0.8,
        ease: 'easeInOut',
    };

    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={contactVariants}
            transition={pageTransition}
        >
            <main className="custom-contact-us-height flex items-center justify-center bg-gray-100">
                <div className="mt-[100px] xl:mb-[100px] w-full max-w-6xl">
                    <h1 className="mx-5 md:mx-auto text-[40px] md:text-[80px] font-bold text-left mb-10 font-cormorant_garamond uppercase font-light">
                        {faqTitle}
                    </h1>
                    <div className="faq mx-5 md:mx-auto uppercase font-montserrat px-6 pt-5 pb-16 max-w-[1000px] text-sm">
                        {faqItems.map((item, index) => (
                            <div key={index} className="faq-item pb-4 mb-4">
                                <button
                                    className="font-montserrat uppercase w-full text-left font-bold text-lg py-2 flex justify-between items-center"
                                    onClick={toggleAccordion}
                                >
                                    {item.question}
                                     
                                </button>
                                <p>{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </motion.div>
    );
}