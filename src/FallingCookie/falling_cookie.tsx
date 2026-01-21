


import './falling_cookie.css'

import Cookie from '../assets/cookie.png';

function FallingCookie({ onReachBottom, x, onClick }: { onReachBottom: () => void, x: number, onClick: () => void }) {

  return (

    <div className='fallingText' style={{ left: `${x}vw` }} onAnimationEnd={() => {
      console.log('Animation ended');
      onReachBottom();
    }} onClick={() => {
      console.log('Cookie clicked');
      onReachBottom();
      onClick();
    }
    }>
      <img src={Cookie} alt="Falling Cookie" className='fallingCookie' onClick={() => {
        console.log('Cookie clicked');
        onReachBottom();
      }
      } />
    </div>


  )
}

export default FallingCookie
