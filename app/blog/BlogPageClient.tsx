'use client';

import { motion } from 'framer-motion';
// import { useSiteData } from '@/context/SiteDataContext';


// PagesMap declarations end
interface BlogPageClientProps {
    pagesMap: PagesMap;
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ pagesMap }) => {

    // const data = useSiteData();
    const pageBlogData = pagesMap['blog'];

    // Ensure the FAQ data exists and provide a fallback to prevent errors
    const blogTitle = pageBlogData.title;
 
    // Sample array for blog posts
    const blogPosts = [
        { id: 1, image: '/images/sample1.jpg', title: 'Post One', date: 'Feb 6, 2025' },
        { id: 2, image: '/images/sample2.jpg', title: 'Post Two', date: 'Feb 5, 2025' },
        { id: 3, image: '/images/sample3.jpg', title: 'Post Three', date: 'Feb 4, 2025' },
        { id: 4, image: '/images/sample4.jpg', title: 'Post Four', date: 'Feb 3, 2025' },
        { id: 5, image: '/images/sample5.jpg', title: 'Post Five', date: 'Feb 2, 2025' },
        { id: 6, image: '/images/sample6.jpg', title: 'Post Six', date: 'Feb 1, 2025' },
        { id: 7, image: '/images/sample7.jpg', title: 'Post Seven', date: 'Jan 31, 2025' },
        { id: 8, image: '/images/sample8.jpg', title: 'Post Eight', date: 'Jan 30, 2025' },
    ];

 
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
                        {blogTitle}
                    </h1>
                    <div className="blog md:mx-auto uppercase font-montserrat pt-5 pb-16 text-sm">
                        <div className="grid grid-cols-2 w-full">
                            {blogPosts.map((post, ind) => (
                                <div key={post.id} className={"border border2-red-500 flex flex-col items-center text-center pr-[80px] pb-[40px] " + ( ind%2==1 ? "pt-[80px]" : "" )}>
                                    <img src={"http://localhost/GitHub/lifeclicks/wp-backend/wp-content/uploads/2024/11/atest4.jpg"} alt={post.title} className="w-full object-cover mb-3" />
                                    <h2 className="text-lg">{post.title}</h2>
                                    <p className="text-gray-500 text-sm">{post.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}

export default BlogPageClient;