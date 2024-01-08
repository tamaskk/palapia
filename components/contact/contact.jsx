import React, { Fragment, useState } from 'react';
import Input from '../ui/input';
import { useMainContext } from '@/lib/maincontext';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { setRequestStatus, setRequestError, requestStatus } = useMainContext();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('Submit button clicked');

        if (!name || name.trim().length === 0) {
            setRequestError('Please enter your name');
            setRequestStatus('error');
            return;
        }

        if (!email || email.trim().length === 0 || !email.includes('@')) {
            setRequestError('Please enter a valid email');
            setRequestStatus('error');
            return;
        }

        if (!message || message.trim().length === 0) {
            setRequestError('Please enter a message');
            setRequestStatus('error');
            return;
        }

        try {
            setRequestError('Sending message...');
            setRequestStatus('warning');

            const response = await fetch('/api/contact/contact', {
                method: 'POST',
                body: JSON.stringify({ name, email, message }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            console.log(data);

            setRequestError('Message sent successfully!');
            setRequestStatus('success');

            setName('');
            setEmail('');
            setMessage('');
        }
        catch (error) {
            setRequestError('Failed to send message');
            setRequestStatus('error');
        }
    };

    return (
        <Fragment>
            <div className='flex flex-col items-center justify-center h-full w-full gap-16 mt-10 p-4'>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <h1 className='text-5xl font-black'>Contact Us</h1>
                    <p className='text-center text-xl font-semibold'>Do you have any idea for a feature or do you see any bugs?</p>
                </div>
                <div className='flex flex-col gap-5 w-full max-w-2xl'>
                    <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} className='border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-600' />
                    <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-600' />
                    <textarea type="text" placeholder='Message' value={message} onChange={e => setMessage(e.target.value)} className='border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-600' />
                    <button type='button' onClick={submitHandler} className='bg-gray-800 text-white font-semibold p-3 rounded-md hover:bg-gray-700 transition-all duration-300'>
                        Send
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default ContactForm;
