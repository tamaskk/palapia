import React, { useState } from 'react'
import Input from '@/components/ui/input'
import { useMainContext } from '@/lib/maincontext'
import { useSession } from 'next-auth/react'
import Popup from '@/components/popup/popup'

const Settings = () => {
  const { data: session, status } = useSession();

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')

  const { requestStatus, setRequestStatus, requestError, setRequestError } = useMainContext();

  const passwordHandler = async (e) => {
    e.preventDefault();
  
    if (!oldPassword || oldPassword.trim().length === 0 || oldPassword.trim().length < 7) {
      setRequestError('Please fill the old password field!');
      setRequestStatus('error');
      return;
    }
  
    if (!newPassword || newPassword.trim().length === 0 || newPassword.trim().length < 7) {
      setRequestError('Please fill the new password field!');
      setRequestStatus('error');
      return;
    }
  
    if (!newPasswordAgain || newPasswordAgain.trim().length === 0 || newPasswordAgain.trim().length < 7) {
      setRequestError('Please fill the new password again field!');
      setRequestStatus('error');
      return;
    }
  
    if (newPassword === oldPassword) {
      setRequestError('The new password and the old password must be different!');
      setRequestStatus('error');
      return;
    }
  
    if (newPassword !== newPasswordAgain) {
      setRequestError('The new password and the new password again must be the same!');
      setRequestStatus('error');
      return;
    }
  
    try {
      setRequestError('Password changing under process...');
      setRequestStatus('warning');
      const response = await fetch('/api/users/change-password', {
        method: 'PATCH',
        body: JSON.stringify({ oldPassword, newPassword, email: session?.user.email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
    
      const data = await response.json();
      setRequestError(data.message);
      setRequestStatus('success');
      setOldPassword('');
      setNewPassword('');
      setNewPasswordAgain('');
    } catch (error) {
      setRequestError('Password changing failed!' + ' ' + error.message);
      setRequestStatus('error');
    }
  };
  

  return (
    <div className='w-screen h-auto flex flex-col items-center justify-center pb-10'>
      {requestError && requestStatus && <Popup message={requestError} status={requestStatus} />}
      <div className='w-1/2 flex flex-col items-center justify-center gap-5'>
        <div className='flex flex-col items-center justify-center gap-8'>
          <div className='flex flex-col items-center justify-center'>
            <Input type='password' value={oldPassword} onChangeHandler={e => setOldPassword(e.target.value)} placeholder='Old password' label="Old password" ownStyleLabel="text-2xl font-semibold w-full md:w-auto text-center lg:text-left mt-5 mb-2" />
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center'>
              <Input type='password' value={newPassword} onChangeHandler={e => setNewPassword(e.target.value)} placeholder='New password' label="New password" ownStyleLabel="text-2xl font-semibold w-full md:w-auto text-center lg:text-left mt-5 mb-2" />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Input type='password' value={newPasswordAgain} onChangeHandler={e => setNewPasswordAgain(e.target.value)} placeholder='New password again' label="New password again" ownStyleLabel="text-2xl font-semibold w-full md:w-auto text-center lg:text-left mt-5 mb-2" />
            </div>
          </div>
          <button onClick={passwordHandler} className='bg-green-500 text-md lg:text-xl text-white p-4 rounded-lg hover:bg-green-700 transition-all duration-300'>Change your password</button>
        </div>
      </div>
    </div>
  )
}

export default Settings