import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, LayoutDashboard, Search, Users, TrendingUp, Clock, Shield, ChevronDown, Sparkles, Library, BookMarked, Menu, X } from 'lucide-react';
import { fetchBooks } from '../services/api';

const LandingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [books, setBooks] = useState([]);
    const booksStripRef = useRef(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data || []);
            } catch (err) {
                console.error('Failed to load books for landing strip:', err);
            }
        };
        loadBooks();
    }, []);

    // Auto-scroll the horizontal books strip in a loop
    useEffect(() => {
        const container = booksStripRef.current;
        if (!container) return;

        const scrollStep = 1; // pixels per tick
        const intervalMs = 30; // speed

        const id = setInterval(() => {
            if (!container) return;

            const { scrollLeft, scrollWidth, clientWidth } = container;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

            if (atEnd) {
                container.scrollTo({ left: 0, behavior: 'instant' });
            } else {
                container.scrollTo({ left: scrollLeft + scrollStep, behavior: 'instant' });
            }
        }, intervalMs);

        return () => clearInterval(id);
    }, [books.length]);

    const getBookCoverUrl = (title) => {
        if (!title) return null;
        const t = title.toLowerCase();

        if (t.includes("harry potter and the sorcerer's stone")) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcWZcmF4PEguLaXWcTytFTlAXxanzcmoqWnJ8SHCMTBiWTJrPIbMHhYzTDUEphaIXPDtzSejjkMMvbzFaU3uIi76v2fVeWHcQrSy8pcj37QV_lHLgiIYi3hJorkI7YsE&s=10&ec=121528429';
        }

        if (t.includes('the alchemist')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe2Gj5mylbdBUTOQfSAXbRFwqKgi39MZ-R9XZBF7BAR7nBOq2nm251xaILQudoT2PxmiBK--GRPSVrI95jnRDqRd76E_9xVerAA58PZznE4hjluh_Jehws3Ym-6flOe7Q_&s=10&ec=121528429';
        }

        if (t.includes('atomic habits')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoBljytXD9HBXTimAEyVIr6Y7eRIWxk6uVoaNblh-oBC5AmODgSsJLmZydIY5iNqXe6FodQV1QqKsC5PK9XddzCXBrW0_d1WJ26nToulgmKanomAuW-nsO_tyovD5Ys9I&s=10&ec=121528429';
        }

        if (t.includes('chamber of secrets')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2KaQHeoGW20CJgx4BX4kH_ej2OnrVdIGSp_fScQ43k1ApT1PqILKdVLQ6tYkgUA_4ykSnv3tYc76k1MsmnR5zZAh2clhcdNZLKs8W1uziZQ5K46EQ3v3Iljr0pgN4VI&s=10&ec=121528429';
        }

        if (t.includes('deep work')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qaxTbi3Iw_ATPXHdCfdJ-TskkfqlqHiv-pPhT2aTEjscyuRi-wZB5rMP_ttAthZ2zymjOVchIZjQP3uvTV1uBj4j2v9ZtNyJCOVQeJAejENh6pvZ7esZlEzzkCtomGE&s=10&ec=121528429';
        }

        if (t.includes('ikigai')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6prj9o0xcxs_0LUX2P_cwCxM7Oah0tfCO8IlnetlDgGp5DTqwyckCFXpC9AjSXOp6S0Gnjm8qCXe5k6R6v3B8fcb1EwyzPVK0ENCVDiv7QzDNcpqE3K33CQQBVVnJLB1S&s=10&ec=121528429';
        }

        if (t.includes('rich dad poor dad')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2e_1UR5rBKkdEo0BJnBp3EQDUEZzARpbUc06111Bnv4CzSC-4hffaWnbZ1otq0yNGK_zW0QSlfTPJvK4uuJhHNiVS3XrJT6B7rq_DF-B5N_rYDHNSQHjr7hX4IRnGZN3P&s=10&ec=121528429';
        }

        if (t.includes('psychology of money')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSewV0gA3HZZ9DACcZhcFLS7b9i48DklRRibmcA2Atsc9kJcweryYlyIHm2wPIgYepJsBomoVn67ESAgXPLgYzjlqwK4UyCbI6rfcV36tOUUAmzhb786wqEgw6q92KLeoaM&s=10&ec=121528429';
        }

        if (t.includes('sapiens')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB_IqvomEW0OG9C1wjB4z14sK_aQIRAv0xiD74bJaBaIwkRv380ShvjXh_eY8rTC08xqfczYHUhOvG3qEJiJr0kNh43SASrnMG6380AJ0C3U66Y187nn7Ga7PMSiUr_lMs&s=10&ec=121528429';
        }

        if (t.includes('power of now')) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW2cU0D2b3NVHacbUBkJMtKMLYmQavpOpQg_liSnko8g-VHmJEiPr4Jy1qbJbqoIkWOKrQlxhtItUnobTtKJY6j1pDXsNncsW57-oUwYqvP1w18CNkS3pFsCQsr4Hga_un&s=10&ec=121528429';
        }

        // Default: no specific cover, use placeholder
        return null;
    };

    const faqs = [
        {
            question: "What are your delivery charges?",
            answer: "Delivery is free for orders above 499."
        },
        {
            question: "How long does delivery take?",
            answer: "Orders are delivered within 3-5 working days."
        },
        {
            question: "Can I cancel my order?",
            answer: "Yes, you can cancel before it is shipped."
        },
        {
            question: "Do you offer refunds?",
            answer: "Refunds are processed within 5-7 business days."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept UPI, cards, and net banking."
        },

        {
            question: "What payment methods are accepted?",
            answer: "We accept UPI, cards, and net banking."
        },
        {
            question: "How can I track my order?",
            answer: "Use your order ID to check status in chat."
        },
        {
            question: "What genres are available?",
            answer: "We offer fiction, fantasy, finance, business, self-help, thriller, history, biography, sci-fi and more."
        },

        {
            question: "Do you have cash on delivery?",
            answer: "Yes, COD is available for most locations."
        }
    ];

    const features = [
        {
            icon: MessageCircle,
            title: "Rule-Based Chat Flows",
            description: "Guide customers through predefined chat flows for book search, orders, payments, and delivery queries.",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Search,
            title: "Guided Book Search",
            description: "Help users find books by genre, author, or reading goal using simple rule-based prompts.",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: Library,
            title: "Bookstore Inventory View",
            description: "Connect to your catalog and expose only what you need through a clean, rule-driven interface.",
            color: "from-blue-600 to-indigo-600"
        },
        {
            icon: TrendingUp,
            title: "Upsell & Recommendations",
            description: "Use rules to surface popular titles, bundles, and related books right inside the chat.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Users,
            title: "Order & Customer Support",
            description: "Answer order status, cancellations, and refund questions instantly without human intervention.",
            color: "from-indigo-600 to-purple-600"
        },
        {
            icon: Shield,
            title: "Reliable n8n Automation",
            description: "Built on n8n workflows so every chatbot response is transparent, testable, and easy to change.",
            color: "from-blue-600 to-blue-700"
        }
    ];



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <BookOpen className="text-white" size={20} />
                            </div>
                            <div>
                                <h1 className="text-base sm:text-xl font-bold text-gray-900">ChatBooks</h1>
                                <p className="text-xs text-gray-500 hidden sm:block">Rule-Based Bookstore Assistant</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                to="/chat"
                                className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
                            >
                                <MessageCircle size={18} />
                                Chat
                            </Link>
                            <Link
                                to="/admin"
                                className="px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <LayoutDashboard size={18} />
                                Admin
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 space-y-2">
                            <Link
                                to="/chat"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                            >
                                <MessageCircle size={18} />
                                Chat
                            </Link>
                            <Link
                                to="/admin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
                            >
                                <LayoutDashboard size={18} />
                                Admin
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
                                <Sparkles size={16} className="text-blue-600" />
                                <span className="text-sm font-medium text-blue-900">Rule based Chatbot</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 antialiased">
                                Chatbot
                                <span className="block text-blue-600">
                                    for Bookstore Management
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed mb-8 antialiased">
                                Turn your bookstore into a guided chat experience. Handle FAQs, book discovery, and order queries using clear, maintainable rules instead of complex code.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/chat"
                                    className="group px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={20} />
                                    Try the Chatbot
                                    <ChevronDown size={18} className="group-hover:translate-x-1 transition-transform rotate-[-90deg]" />
                                </Link>
                                <Link
                                    to="/admin"
                                    className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-blue-300 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <LayoutDashboard size={20} />
                                    Admin Dashboard
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div
                                className="relative rounded-2xl p-8 border border-blue-100 shadow-2xl overflow-hidden"
                                style={{
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1579370318443-8da816457e3d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeSUyMGJvb2tzfGVufDB8fDB8fHww")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-900/40 to-indigo-900/40"></div>
                                <div className="relative">
                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-40 blur-xl"></div>
                                    <BookMarked size={280} className="text-blue-100/60 mx-auto" strokeWidth={1} />
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-gray-700">Your Personalized Bookstore Assistant</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Ready to help you find your next great read with ease...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal Books Strip */}
            <div className="px-4 sm:px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-sm font-semibold text-gray-800 mb-3">
                        Featured books from your catalog
                    </h2>
                    <div className="overflow-x-auto pb-2" ref={booksStripRef}>
                        <div className="flex space-x-4 min-w-max">
                            {books.slice(0, 10).map((book) => {
                                const coverUrl = getBookCoverUrl(book.title);
                                return (
                                    <div
                                        key={book.book_id || book.id || book.title}
                                        className="relative w-48 h-64 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col p-4"
                                    >
                                        {/* Stock badge */}
                                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-green-100 text-green-800 text-[10px] font-semibold">
                                            {book.stock} in stock
                                        </div>

                                        {/* Book cover */}
                                        {coverUrl ? (
                                            <img
                                                src={coverUrl}
                                                alt={book.title}
                                                className="h-24 w-full mb-3 rounded-md object-cover shadow-sm"
                                            />
                                        ) : (
                                            <div className="h-24 mb-3 rounded-md bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-[11px] text-blue-700 font-medium">
                                                Book cover
                                            </div>
                                        )}

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                                                    {book.title}
                                                </p>
                                                <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                                                    {book.author}
                                                </p>
                                            </div>
                                            <p className="text-sm font-bold text-blue-600 mt-2">
                                                ₹{book.price}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            {books.length === 0 && (
                                <div className="text-xs text-gray-500">
                                    Loading books from catalog...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Everything Your Bookstore Needs
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                            Rule-based chat flows, analytics, and admin tools designed for modern bookstore operations.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                                        <Icon size={24} className="text-white sm:w-7 sm:h-7" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Common Questions
                        </h2>
                        <p className="text-xl text-gray-600">
                            Everything you need to know about our rule-based bookstore chatbot
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-all"
                                >
                                    <span className="text-lg font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={24}
                                        className={`text-blue-600 flex-shrink-0 transition-transform ${openFaq === index ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 py-4 bg-blue-50/50 border-t border-gray-100">
                                        <p className="text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 px-6 bg-gradient-to-br from-blue-600 to-indigo-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to Automate Your Bookstore?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Plug this rule-based chatbot into your existing systems and start answering customer questions instantly.
                    </p>
                    <Link
                        to="/chat"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <MessageCircle size={24} />
                        Get Started Now
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <BookOpen className="text-white" size={20} />
                            </div>
                            <div>
                                <span className="text-base sm:text-lg font-bold text-gray-900">Bookstore Chatbot</span>
                                <p className="text-xs text-gray-500">Rule-Based Bookstore Management</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 sm:gap-8">
                            <Link to="/chat" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm sm:text-base">
                                Chat
                            </Link>
                            <Link to="/admin" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm sm:text-base">
                                Admin
                            </Link>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 text-center">
                        <p className="text-xs sm:text-sm text-gray-500">
                            © 2026 Bookstore Chatbot. Crafted with care for modern bookstores. By Pranab Bhardwaj
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
