import { useState, useRef, useEffect } from 'react';
import API_BASE_URL from '../config';

function AIAssistant() {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Namaste! I am your AI Agri-Assistant. Ask me anything! (வணக்கம்! நான் உங்கள் விவசாய உதவியாளர்)' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'ta'
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, language })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I am having trouble connecting to the server.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto h-[600px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100 font-sans">
            <div className="bg-green-600 p-4 text-white font-bold text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <span>{language === 'ta' ? 'AI விவசாய உதவியாளர்' : 'AI Assistant'}</span>
                </div>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-green-700 text-white border border-green-500 rounded px-2 py-1 text-sm outline-none cursor-pointer"
                >
                    <option value="en">English (ஆங்கிலம்)</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                </select>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                            ? 'bg-green-600 text-white rounded-tr-none'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={language === 'ta' ? "கேள்வி கேளுங்கள்..." : "Ask something..."}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    {language === 'ta' ? 'அனுப்பு' : 'Send'}
                </button>
            </form>
        </div>
    );
}

export default AIAssistant;
