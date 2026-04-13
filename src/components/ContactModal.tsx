import * as Dialog from '@radix-ui/react-dialog';
import { X, Mail, Phone, Instagram, Send, User, Building, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const FORMSPREE_ID = 'mqewzyqq'; // ← يرجى التأكد من أن هذا المعرف صحيح من حساب Formspree الخاص بك

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `تواصل جديد من: ${formData.name}`,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone || 'غير مزود',
          message: formData.message || 'بدون رسالة'
        })
      });

      if (response.ok) {
        toast.success('تم إرسال رسالتك بنجاح!', {
          description: 'سنتواصل معك في أقرب وقت ممكن.',
        });
        onClose();
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        const errorData = await response.json();
        toast.error('حدث خطأ أثناء الإرسال', {
          description: errorData.error || 'يرجى المحاولة مرة أخرى لاحقاً.',
        });
      }
    } catch (error) {
      toast.error('خطأ في الاتصال', {
        description: 'تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] animate-in fade-in duration-300" />
        <Dialog.Content 
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl z-[101]",
            "bg-[#111] border border-blue-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden",
            "animate-in zoom-in-95 fade-in duration-500 ease-out-quart"
          )}
        >
          {/* Neon Border Effect */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-blue-400/20 pointer-events-none shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-2">
                <Dialog.Title className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  تواصل <span className="text-blue-400">معي</span>
                </Dialog.Title>
                <Dialog.Description className="text-white/50 text-sm font-light">
                  املأ النموذج أدناه وسأرد عليك في أقرب وقت ممكن.
                </Dialog.Description>
              </div>
              <Dialog.Close className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <X size={20} />
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-geist-mono uppercase tracking-widest text-white/40 ml-1">الاسم</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="يوسف طارق"
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-xs font-geist-mono uppercase tracking-widest text-white/40 ml-1">اسم الشركة</label>
                  <div className="relative group">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      required
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="شركتك المتوقرة"
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-geist-mono uppercase tracking-widest text-white/40 ml-1">البريد الإلكتروني</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-geist-mono uppercase tracking-widest text-white/40 ml-1">رقم الجوال (اختياري)</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+966 5x xxx xxxx"
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-geist-mono uppercase tracking-widest text-white/40 ml-1">رسالتك</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="كيف يمكنني مساعدتك؟"
                    rows={4}
                    className="w-full pl-12 pr-6 py-6 bg-white/5 border border-white/10 rounded-3xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                className={cn(
                  "w-full py-5 bg-blue-500 text-white rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 transition-all",
                  "hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group"
                )}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>إرسال الرسالة</span>
                    <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/5">
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all">
                  <Instagram size={24} />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all">
                  <WhatsAppIcon size={24} />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-[#FFFC00] hover:border-[#FFFC00]/50 hover:bg-[#FFFC00]/5 transition-all">
                  <SnapchatIcon size={24} />
                </a>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.602 6.006L0 24l6.149-1.613a11.815 11.815 0 005.9 1.532h.005c6.634 0 12.032-5.396 12.035-12.03a11.8 11.8 0 00-3.417-8.467z" />
    </svg>
  );
}

function SnapchatIcon({ size = 24 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 1024 1024" 
      fill="currentColor"
    >
      <path d="M512.6 109c-36.4 0-71.1 6.5-103.1 19.3-30.4 12.1-57.8 29.5-81.5 51.6-23.7 22.1-42.9 48.4-56.9 78.1s-21.2 62.4-21.3 97.2c0 21 .5 39 .5 39 0 3.2-.2 6.4-.5 9.6-1.9 22.4-7.4 43.1-16.1 61.3-13.6 28.6-32.9 50.4-57.1 64.3a116.8 116.8 0 0 1-52.6 15c-15.6 0-29.7-5.5-41.2-16.1s-18.2-24.1-19.4-39.7c-.5-6.7-3.9-12.6-9.4-16.1a19.7 19.7 0 0 0-18.5-.7c-17.5 7.8-31 20.8-38.6 37.1s-9.3 35.1-4.8 53.9c3.3 13.9 10.1 26.2 19.7 35.7s21.1 16.3 33.7 20c15 4.3 34 6.7 55.4 6.7 5.1 0 10.3-.1 15.6-.4 10.1-.5 18 5.7 21 14.1 4.5 12.4 8.2 28 11 46a165 165 0 0 1 2.3 27.5c0 10.7-.5 20.3-1.6 28.5-.9 6.8-.4 13.4 1.5 19.3s5.1 11.1 9.4 15.1c8.1 7.7 20.5 11.6 35.7 11.4 14.8-.2 25.1-5.1 34.6-12.1a35.8 35.8 0 0 0 11.1-14.7c2.6-6.6 4.7-16.1 6.1-27.4.2-1.9.4-3.8.6-5.8.5-4.6 2.5-8.5 5.8-11.2 2.1-1.8 5.4-3.1 9.3-3.7l9 .1c13.2.5 25.5-2.2 35.7-7.7 11.1-6 19.4-15 24.3-26a45 45 0 0 0 3.5-16.8c0-5.8-1.1-10.7-3.2-14.5a24 24 0 0 0-8.8-9 14 14 0 0 1-4.7-5.3c-.9-1.9-.8-4 .1-6 20.9-45.7 64.6-77.9 116.3-84.7s102.3 11.5 137.9 49.3c5 5.3 10.1 9.5 15.1 12.3 8.3 4.6 15.2 6.5 21.3 6.1s11.5-2.5 16.5-6.6c6.4-5.2 10.7-12.2 12.6-20.2s1-16.6-2.5-24.6c-4.4-10-12.7-17-23.7-20.1-5.1-1.4-10.7-2.3-16.7-2.5-11.5-.4-20.4-4.8-25.7-12.8-5-7.5-6.7-18.4-5.2-31.4.1-1.3.4-2.8.7-4.4.9-4.8 3.5-8.8 7.3-11.3 3.4-2.2 7.7-3.4 12.2-3.4h5.2a159.9 159.9 0 0 1 45.4 6.7c15.7 4.1 27.6 11.8 34.7 22.4 4.4 6.6 6.1 14.4 5.3 22.3-.9 8.2-5.4 15.8-12.7 21.7s-17.1 9.3-27.9 10c-5.9.4-10.3 3.6-12.6 8.6s-1.8 11.6 1.4 18.2c8.2 16.9 22.1 29.8 40.1 36.8s37.7 8.3 56.4 4c25.4-5.9 40.2-18.7 48.7-36.8s7.9-39.7-1.1-61.9c-2.7-6.7-7-12.4-12.6-16.1s-12.3-5.9-19.4-6.4c-12-.9-21-6.1-26.6-15.1-6.5-10.5-8.1-24.6-4.5-40.4s11.4-29.9 21.6-40.4c9.1-9.4 17.1-14.7 23.3-15.6 1-.1 1.9-.1 2.9-.1h3.3c35.5.9 66.8-19.1 82.3-48.4s13.4-66.7-5-101.9c-3.1-5.9-7-11.5-11.6-16.5-12.9-13.9-28-25-44.5-32.9l-22.3-10.1s-5-2-5-11.4c0-36-6.4-68-19.1-94.8s-30.8-49.3-54.3-66.4-50.5-29.2-80.1-35.1c-28.5-5.7-58.4-8.5-88.9-8.5z" />
    </svg>
  );
}

