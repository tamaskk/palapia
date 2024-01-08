import React, { useEffect, useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [answerPanel, setAnswerPanel] = useState(false);
  const [choosen, setChoosen] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/contact/contact');
        const data = await res.json();
        setMessages(data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Initialize SendGrid API key outside the component

  const sendMessage = async () => {
    const emailData = {
      to: choosen.email,
      subject: 'Palapia - Contact',
      text: answer,
    };

    try {
      console.log(choosen.email)
      console.log(answer)
      const response = await fetch('/api/contact/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending emaidsal');
      }
    } catch (error) {
      console.error('Error sending emailasd:', error);
    }
  };

  const handleAnswer = (message) => {
    setAnswerPanel(!answerPanel);
    setChoosen(message);
  };

  return (
    <div className='w-full h-full flex flex-row items-start jutsify-center gap-8 p-4'>
      {messages?.map((message, index) => (
        <div key={index} className='bg-white shadow-lg rounded-lg w-1/4 h-auto py-8 px-4 text-center' onClick={() => handleAnswer(message)}>
          <div className='flex flex-col items-center justify-between p-4 w-full'>
            <div className='flex flex-col w-full'>
              <span className='text-gray-600 font-bold text-xl'>{message.name}</span>
              <span className='text-gray-400 text-xs'>{message.email}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-gray-400 text-xs'>{message.date}</span>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start p-4 w-full text-center'>
            <span className='text-gray-600 text-sm w-full'>{message.message}</span>
          </div>
        </div>
      ))}

      {answerPanel && (
        <div className='bg-white shadow-lg rounded-lg w-[90%] h-auto py-8 px-4 text-center fixed top-[5%] right-[5%] cursor-pointer'>
          <div className='absolute top-0 right-0 p-4'>
            <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg' onClick={() => setAnswerPanel(!answerPanel)}>X</button>
          </div>
          <div className='flex flex-col items-center justify-between p-4 w-full'>
            <div className='flex flex-col w-full'>
              <span className='text-gray-600 font-bold text-xl'>{choosen.name}</span>
              <span className='text-gray-400 text-xs'>{choosen.email}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-gray-400 text-xs'>{choosen.date}</span>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start p-4 w-full text-center'>
            <span className='text-gray-600 text-sm w-full'>{choosen.message}</span>
          </div>
          <div className='flex flex-col items-start justify-start p-4 w-full text-center'>
            <textarea className='w-full h-32 border border-gray-200 rounded-lg p-4 text-gray-600 text-sm' onChange={e => setAnswer(e.target.value)} placeholder='Answer' />
          </div>
          <div className='flex flex-col items-start justify-start p-4 w-full text-center'>
            <button onClick={() => sendMessage(choosen.email)} className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg'>Send</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Messages