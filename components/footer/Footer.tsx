const Footer = () => {
  return (
    <div className='text-center w-[calc(100%-1rem)] h-[1.8rem] relative mt-6'>
      &copy; {new Date().getFullYear()} Robert Hijmans. All Rights Reserved.
    </div>
  );
};

export default Footer;
