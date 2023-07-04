import Link from "next/link";
import Image from 'next/image';
import logo from '../public/images/landingPage/nav-logo.png';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid col-10 mx-auto">
                <Link className="navbar-brand" href="/">
                    <div className="col-2 d-flex">
                        <Image src={logo} width={30} alt='logo' />
                        <span>Venture</span>
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center justify-content-md-end" id="navbar-menu">
                    <ul className="navbar-nav">
                        <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                            <a className="text-dark px-md-3 py-3 w-auto text-decoration-none " href="#">Learning Hub</a>
                        </li>
                        <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                            <a className="text-dark px-md-2 pe-md-4 py-2 w-auto text-decoration-none" href="#">Resources Hub</a>
                        </li>
                        <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                            <a className="text-dark px-md-2 pe-md-4 py-2 w-auto text-decoration-none" href="#">Programs and Events</a>
                        </li>
                        <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                            <a className="text-dark px-md-2 pe-md-4 py-2 w-auto text-decoration-none" href="#">Coaches</a>
                        </li>
                        <button className="nav-item btn flex-row justify-content-start align-items-center my-2 my-md-0" style={{backgroundColor: "#5A27D5"}}>
                            <a className="text-light px-2 py-2 button-solid w-auto text-decoration-none" href="#">Sign up</a>
                        </button>
                    </ul>
                </div>
            </div>
            

            {/* <header class="navbar navbar-expand-md  d-lg-flex d-print-none  nav py-2 py-lg-3 border-0 bg-transparent" style="z-index: 9999;"><div class="container mx-auto"><div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3 py-0 pt-1 me-auto"><a href="/"><img alt="Tabler" src="/logo/nav-logo.svg" width="2000" height="100" decoding="async" data-nimg="1" class="" loading="lazy" style="color: transparent; width: 11rem; height: auto; object-fit: cover;"></a></div><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse justify-content-center justify-content-md-end" id="navbar-menu"><ul class="navbar-nav"><li class="nav-item flex-row justify-content-start align-items-center"><a class="px-md-3 py-2 w-auto text-decoration-none nav__public--link" href="/learning-hub">Learning Hub</a></li><li class="nav-item flex-row justify-content-start align-items-center"><a class="px-md-2 pe-md-4 py-2 w-auto text-decoration-none nav__public--link" href="/resources-hub">Resources Hub</a></li><li class="nav-item flex-row justify-content-start align-items-center my-2 my-md-0"><a class="px-4 py-2 button-solid w-auto text-decoration-none" href="/dashboard">Dashboard</a></li></ul></div></div></header> */}
        </nav>
    );
};

export default Navbar;
