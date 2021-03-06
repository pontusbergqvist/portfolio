import MenuItem from './menuitem';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getValues } from '../../utils/nav';

const MenuItems = () => {
  const router = useRouter();
  const [initPosition, initTranslate] = getValues(router);
  const [position, setPosition] = useState(initPosition);
  const [translate, setTranslate] = useState(initTranslate);

  useEffect(() => {
    if (router.route === '/') {
      setPosition(0);
      setTranslate('0%');
    } else if (router.route.slice(0, 5) === '/work') {
      setPosition(180);
      setTranslate('-50%');
    } else if (router.route.slice(0, 5) === '/blog') {
      setPosition(360);
      setTranslate('-100%');
    }
  }, [router.route]);

  return (
    <div className="w-[360px] h-[35px] hidden md:block relative">
      <ul className="w-full h-full hidden md:flex items-center justify-between">
        <MenuItem route="/" />
        <MenuItem route="/work" />
        <MenuItem route="/blog" />
      </ul>
      <motion.div
        className={`bg-item-dark dark:bg-item-light h-full top-0 w-[72px] rounded absolute`}
        animate={{ x: position, translateX: translate }}
        initial={false}
      ></motion.div>
    </div>
  );
};

export default MenuItems;
