'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
      
      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400">NAME</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-green-500 outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400">EMAIL</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-green-500 outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-mono text-zinc-400">MESSAGE</label>
        <textarea
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
          className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-green-500 outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          placeholder="Details about your inquiry..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
          <XCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-black font-bold py-3 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            SENDING...
          </>
        ) : (
          'SEND MESSAGE'
        )}
      </button>
    </form>
  );
}
