function Button({buttonText,loading}) {
  return (
    <button className='bg-linear-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg font-bold transition-all hover:opacity-80 active:opacity-70 cursor-pointer' disabled={loading}>{loading?"Loading...":buttonText}</button>
  )
}

export default Button