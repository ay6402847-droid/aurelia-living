import React, { useState } from 'react';
import { X, CheckCircle, Mail, MapPin, Phone, Clock } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Interior Consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative bg-[#F7F5F1] rounded-2xl max-w-2xl w-full border border-[#D8C9B8] shadow-2xl overflow-hidden my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 text-[#85817B] hover:text-[#292929] rounded-full hover:bg-[#EEEAE3] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 bg-white">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-[#292929]">Inquiry Received</h3>
              <p className="text-xs sm:text-sm text-[#85817B] max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Our Copenhagen design team has logged your message. (Demo form active: integrate SendGrid, Resend, or your Hostinger SMTP mailer in production).
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-[#292929] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#493326] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C98755]">
                  Aurelia Concierge
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#292929] mt-1">
                  Connect With Our Design Team
                </h2>
                <p className="text-xs sm:text-sm text-[#85817B] mt-1">
                  Whether requesting timber swatch samples, bespoke dimension adaptations, or trade project quotes, we are at your service.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#292929] mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292929] mb-1">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                  >
                    <option>Interior Consultation &amp; Styling</option>
                    <option>Custom Dimensions &amp; Swatch Kits</option>
                    <option>White Glove Logistics &amp; Delivery</option>
                    <option>Architectural &amp; Trade Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292929] mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your room, floor dimensions, or project timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F5F1] border border-[#D8C9B8] rounded-xs focus:outline-none focus:border-[#C98755]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C98755] hover:bg-[#b57544] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-colors cursor-pointer"
                  >
                    Send Concierge Message
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-[#EEEAE3] grid grid-cols-2 gap-4 text-xs text-[#85817B]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C98755]" />
                  <span>Response within 4 business hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C98755]" />
                  <span>concierge@aurelialiving.com</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
