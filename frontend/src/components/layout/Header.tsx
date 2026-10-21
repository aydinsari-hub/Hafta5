interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  return (
    <header className="ust-bilgi site-baslik">
      <div className="kapsayici">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </header>
  );
}

export default Header;
