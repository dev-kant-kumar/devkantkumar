import { motion } from 'framer-motion';
import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

const ServiceChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'manager',
      name: 'Alex M.',
      avatar: 'A',
      text: 'Hi there! I have reviewed your requirements for the e-commerce project. Everything looks clear.',
      time: '10:30 AM',
      date: 'Today'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Great! When can we expect the initial wireframes?',
      time: '10:35 AM',
      date: 'Today'
    },
    {
      id: 3,
      sender: 'manager',
      name: 'Alex M.',
      avatar: 'A',
      text: 'I will share the first draft by tomorrow evening for your feedback.',
      time: '10:36 AM',
      date: 'Today'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today'
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            A
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Alex M.</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="block w-2 h-2 rounded-full bg-green-500" /> Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              {msg.sender === 'manager' && (
                <div className="h-8 w-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold mt-1">
                  {msg.avatar}
                </div>
              )}

              <div>
                <div
                  className={`p-3 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-600 text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <p className={`text-[10px] text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 bg-gray-100 border-transparent focus:bg-white focus:border-green-500 focus:ring-0 rounded-full text-sm transition-all"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceChat;
