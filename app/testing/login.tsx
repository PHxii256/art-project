'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    console.log(res)
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className='m-4'>
      <h1 className='font-bold text-6xl'>Auth</h1>
      <div className='mt-4 mb-2 flex-row flex-grow'>
        <Button variant="outline" size="lg" className='mr-2 mt-2' onClick={handleSignUp}>Sign up</Button> 
        <Button variant="outline" size="lg" className='mr-2 mt-2' onClick={handleSignIn}>Sign in</Button> 
        <Button variant="outline" size="lg" className='mr-2 mt-2' onClick={handleSignOut}>Sign out</Button> 
      </div>
      <Input name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} className='h-14 w-min mr-2 mb-0 inline'/>
      <Input
        className='h-14 w-min mr-2 inline mt-2'
        placeholder='Password' 
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
    </div>
  )
}