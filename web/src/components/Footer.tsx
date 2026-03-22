const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-foreground border-t border-background/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-background/30">
          © {new Date().getFullYear()} Aliasist. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-background/20 tracking-[0.15em] uppercase">
          Coded by Blake | Aliasist_Site v.1.0.2
        </p>
        <p className="font-mono text-[10px] text-electric/60 tracking-[0.1em] uppercase">
          Signal: Active ◈
        </p>
      </div>
    </footer>
  );
};

export default Footer;
