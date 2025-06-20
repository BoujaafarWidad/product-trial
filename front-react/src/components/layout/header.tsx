import { ShoppingCart } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  let navigate = useNavigate()

  return (
    <div className={'z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6 border-b shadow-sm'}>
      <button
        onClick={() => navigate('/')}
        className="text-xl font-bold text-gray-900 transition-colors cursor-pointer"
      >
        Alten
      </button>
      <div className="md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full">
        <Button
          variant="ghost"
          onClick={() => navigate("/contact")}
          className='cursor-pointer'>
          Contact Us
        </Button>
        <button className='relative p-2 rounded-md transition-colors cursor-pointer' onClick={() => navigate('/cartlist')}>
          <ShoppingCart />
          {totalItems > 0 && (
            <span className='absolute -top-0.5 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>{totalItems > 99 ? '+99' : totalItems}</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Header;