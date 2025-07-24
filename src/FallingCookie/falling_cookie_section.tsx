

import { useEffect, useState } from 'react';
import './falling_cookie_section.css'
import FallingCookie from './falling_cookie';



function FallingCookieSection({ onCookieClick }: { onCookieClick: () => void }) {
  const [count, setCount] = useState<number[]>([]);

  useEffect(() => {

    setTimeout(() => {
      setCount((prevCount) => [Math.floor(Math.random() * 80)]);
    }, 5000);
  }, []);




  return (

    <div className="falling-code">
      {
        count.map((_, i) => {
          return <FallingCookie key={i} x={count[i]} onClick={onCookieClick} onReachBottom={() => {
            console.log('Animation ended');
            setCount([]);
            setTimeout(() => {
              setCount((prevCount) => [...prevCount, Math.floor(Math.random() * 80)]);
            }, 5000);
          }} />
        })
      }
    </div>


  )
}

export default FallingCookieSection
