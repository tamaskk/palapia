import React, { useEffect, useState } from 'react';
import { useMainContext } from '../../lib/maincontext'

const Messages = () => {
  const [answerPanel, setAnswerPanel] = useState(false);
  const [choosen, setChoosen] = useState(null);
  const [answer, setAnswer] = useState('');

  const { messages } = useMainContext();

  useEffect(() =>  {
    console.log(choosen)
  }, [choosen])

  // Initialize SendGrid API key outside the component

  const sendMessage = async () => {
    const emailData = {
      to: choosen.email,
      subject: 'Palapia - Contact',
      text: answer,
    };
  
    try {
      const responseEmail = await fetch('/api/contact/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      if (responseEmail.ok) {
        alert('Email sent successfully');
  
        try {
          const responseDatabase = await fetch('/api/contact/contact', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: choosen._id, answer: answer }), // Assuming choosen._id is the correct property
          });
  
          if (responseDatabase.ok) {
            alert('Changed in database');
          } else {
            alert('Error changing in database');
          }
        } catch (errorDatabase) {
          console.error('Error changing in database:', errorDatabase);
          alert('Error changing in database');
        }
  
      } else {
        alert('Error sending email:', responseEmail.status);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email:', error.message);
    }
  };
  
  

  const handleAnswer = (message) => {
    setAnswerPanel(!answerPanel);
    setChoosen(message);
  };

  return (
    <div className='w-full h-full flex flex-row flex-wrap max-w-full items-start jutsify-center gap-8 p-4 overflow-y-auto'>
      {messages?.filter((message => message.answered === false)).length > 0 ? messages?.filter((message => message.answered === false)).map((message, index) => (
        <div key={index} className='bg-white shadow-lg rounded-lg w-1/4 h-auto py-8 px-4 text-center' onClick={() => handleAnswer(message)}>
          <div className='flex flex-col items-center justify-between p-4 w-full'>
            <div className='flex flex-col w-full'>
              <span className='text-gray-600 font-bold text-xl'>{message.name}</span>
              <span className='text-gray-400 text-xs'>{message.email}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-gray-400 text-xs'>{message.date}</span>
              <span className='text-red-600'>Not answered</span>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start p-4 w-full text-center'>
            <span className='text-gray-600 text-sm w-full'>{message.message}</span>
          </div>
        </div>
      )) : <div className='text-6xl w-full text-center font-bold p-4'>
      No message to answer
  </div>}
            {messages?.filter((message => message.answered === true)).map((message, index) => (
        <div key={index} className='bg-white shadow-lg rounded-lg w-1/4 h-auto py-8 px-4 text-center' onClick={() => handleAnswer(message)}>
          <div className='flex flex-col items-center justify-between p-4 w-full'>
            <div className='flex flex-col w-full'>
              <span className='text-gray-600 font-bold text-xl'>{message.name}</span>
              <span className='text-gray-400 text-xs'>{message.email}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-gray-400 text-xs'>{message.date}</span>
              <span className='text-green-600'>Answered</span>
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
          {
            choosen.answer && 
            <div className='flex flex-col items-start justify-start p-4 w-full text-center'>
            <span className='text-gray-600 text-sm w-full'>Answer: {choosen.answer}</span>
          </div>
          }
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