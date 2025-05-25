/* === /frontend/src/components/Header.jsx === */
// ... [Header component remains unchanged] ...

/* === /frontend/src/components/Footer.jsx === */
// ... [Footer component remains unchanged] ...

/* === /frontend/src/pages/Landing.jsx === */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    title: "AI Resume Assistant",
    desc: "Generate, improve and tailor your resume using AI-powered insights.",
  },
  {
    title: "Job Tracker",
    desc: "Keep track of your job applications and progress in one place.",
  },
  {
    title: "Smart Job Suggestions",
    desc: "Receive job recommendations based on your skills and preferences.",
  },
  {
    title: "Profile Analytics",
    desc: "View how your resume and profile perform across different job platforms.",
  },
  {
    title: "One-click Apply",
    desc: "Apply to multiple jobs directly with your saved profiles and resumes.",
  },
];

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-100 to-purple-200">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-blue-800 mb-4"
        >
          Welcome to PranHire
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg max-w-2xl mx-auto"
        >
          Your personalized job assistant platform powered by AI. Empower your job search with smart tools.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">Get Started</Link>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to supercharge your career?</h2>
        <p className="mb-6 text-gray-700">Sign up now and take the first step towards landing your dream job.</p>
        <Link to="/signup" className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">Join PranHire</Link>
      </section>
    </div>
  );
};

export default Landingpage;
