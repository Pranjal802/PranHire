import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t py-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h2 className="text-lg font-semibold text-blue-600">PranHire</h2>
          <p className="text-sm">Your personalized job and resume assistant powered by AI.</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
            <li><Link to="/upload" className="hover:text-blue-600">Resume Upload</Link></li>
            <li><Link to="/tracker" className="hover:text-blue-600">Job Tracker</Link></li>
            <li><Link to="/assistant" className="hover:text-blue-600">AI Assistant</Link></li>
            <li><Link to="/profile" className="hover:text-blue-600">Profile</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">Contact & Legal</h3>
          <ul className="space-y-1">
            <li><a href="mailto:support@pranhire.com" className="hover:text-blue-600">Contact Support</a></li>
            <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} PranHire. All rights reserved.</div>
    </footer>
  );
};

export default Footer;