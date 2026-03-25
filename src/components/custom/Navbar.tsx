import SearchForm from '../forms/SearchForm';
import LearneyLogo from './LearneyLogo';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80'>
      <LearneyLogo />
      <SearchForm />
    </header>
  );
}
