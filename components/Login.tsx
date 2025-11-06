import React, { useState, useRef, useEffect } from 'react';
import { StoreIcon } from './icons/StoreIcon';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const otpInputRef = useRef<HTMLInputElement>(null);
    const DUMMY_OTP = '123456'; // In a real app, this would come from a server

    useEffect(() => {
        if (step === 'OTP' && otpInputRef.current) {
            otpInputRef.current.focus();
        }
    }, [step]);
    
    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const phoneRegex = /^[\d\s()+-]{10,15}$/;
        if (!phone.trim() || !phoneRegex.test(phone)) {
            setError('Please enter a valid phone number.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            console.log(`Simulating OTP sent to ${phone}`);
            setIsLoading(false);
            setStep('OTP');
        }, 1200);
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (otp.length !== 6) {
            setError('OTP must be 6 digits.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            if (otp === DUMMY_OTP) {
                onLogin();
            } else {
                setError('Invalid OTP. Please try again.');
                setIsLoading(false);
                setOtp('');
                otpInputRef.current?.focus();
            }
        }, 1200);
    };

    const handleBack = () => {
        setError('');
        setOtp('');
        setStep('PHONE');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
            <div className="max-w-md w-full animate-fade-in-down">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <div className="flex justify-center mb-6">
                        <div className="bg-slate-800 text-white rounded-full p-4">
                            <StoreIcon className="w-8 h-8"/>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
                        Dealer Management Portal
                    </h2>
                    {step === 'PHONE' ? (
                        <>
                            <p className="text-center text-slate-500 mb-8">
                                Enter your phone number to receive a login code.
                            </p>
                            <form onSubmit={handlePhoneSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Your phone number"
                                        required
                                        className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                                    />
                                </div>
                                {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? 'Sending...' : 'Send OTP'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <p className="text-center text-slate-500 mb-2">
                                We've sent a 6-digit code to:
                            </p>
                            <p className="text-center font-medium text-slate-800 mb-6">{phone}</p>
                            <form onSubmit={handleOtpSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="otp" className="sr-only">OTP</label>
                                    <input
                                        ref={otpInputRef}
                                        id="otp"
                                        type="text"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                        placeholder="______"
                                        required
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 text-center text-2xl tracking-[0.75em] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition"
                                        style={{ paddingLeft: 'calc(0.375em + 1rem)' }}
                                    />
                                </div>
                                {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <button onClick={handleBack} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Go Back
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
