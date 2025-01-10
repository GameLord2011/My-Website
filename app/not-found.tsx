import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-center dark:text-white'>
      <h2 className='font-extrabold'>&#34;Not Here!&#34;</h2>
      <p className='font-extralight'> -Dr. Dolittle</p>
      <p>I dunno where you got this link, but it&#39;s wrong, or broken from my &#40;constant&#41; site updates.</p>
      <Link href="/" className='text-emerald-800 dark:text-emerald-400'>Home Page</Link>
    </div>
  )
}