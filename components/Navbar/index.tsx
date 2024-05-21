// Local Imports.
import Auth from './Auth';
import { H3 } from '../ui/typography';

// Component.
export default function Navbar() {
    return (
        <nav
            className={'flex items-center justify-between p-2 max-w-screen-xl'}
        >
            <H3>Feast Finders</H3> <Auth />
        </nav>
    );
}
