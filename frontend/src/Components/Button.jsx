function Button({buttonText,loading}) {
  return (
    <button className='bg-linear-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg font-bold transition-all hover:opacity-80 active:opacity-70 cursor-pointer 2xl:text-5xl 2xl:py-6 2xl:rounded-2xl' disabled={loading}>{loading?"Loading...":buttonText}</button>
  )
}

export default Button