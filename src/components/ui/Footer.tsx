const Footer = () => {
  return (
    <div className="pt-2 border-t-2 border-black bg-grey-100">
      <div className="py-4 border-t-2 border-grey-50 bg-primary-100">
        <div className="flex justify-between gap-8 container mx-auto px-2">
          <span className="text-md text-white">
            Made possible by{' '}
            <a
              className="underline text-orange"
              href="https://templeosrs.com/"
              target="_blank"
            >
              TempleOSRS
            </a>
          </span>

          <span className="text-md text-white">
            Contribute on{' '}
            <a
              className="underline text-orange"
              href="https://github.com/sequenter/Cloggers"
              target="_blank"
            >
              GitHub
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
