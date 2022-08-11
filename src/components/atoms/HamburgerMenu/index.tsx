import { useEffect, useRef } from 'react';

interface Props {
	onHamburgerMenuClick: () => void;
}

const HamburgerMenu = ({ onHamburgerMenuClick }: Props): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const menuBtn = ref.current as HTMLDivElement;
		let menuOpen = false;
		menuBtn.addEventListener('click', () => {
			if (!menuOpen) {
				menuBtn.classList.add('open');
				menuOpen = true;
			} else {
				menuBtn.classList.remove('open');
				menuOpen = false;
			}
		});
	}, []);

	return (
		<div className="menu-btn" ref={ref} onClick={onHamburgerMenuClick}>
			<div className="menu-btn__burger"></div>
		</div>
	);
};

export default HamburgerMenu;
